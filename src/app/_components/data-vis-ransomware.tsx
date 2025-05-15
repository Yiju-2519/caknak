// all imports, including css files and components
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import SwipeRight from './swipe-right';
import './data-vis-ransomware.css';

/**
 * types for data structures used throughout the component
 * 
 * ransomware attack represents a single incident with id, date, and country info
 * week helps track calendar weeks for our heatmap
 * weekdata stores attack counts and label info for each week
 * heatmapbymonth organizes week data by month name
 * statcardprops defines what info each stat card needs to display
 */
interface RansomwareAttack {
  id: number;
  published: string;
  country_code: string;
}

interface Week {
  start: Date;
  end: Date;
  label: string;
  month: number;
  weekOfMonth: number;
}

interface WeekData {
  label: string;
  count: number;
  fullLabel: string;
  dates: string;
  placeholder?: boolean;
}

type HeatmapByMonth = Record<string, WeekData[]>;

interface StatCardProps {
  emoji: string;
  label: string;
  count: number;
  source?: string;
  description?: string;
}

// shorthand month names for more compact display
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// lookup table to convert country codes to full country names for asean countries
const countries: Record<string, string> = {
  MY: 'Malaysia', SG: 'Singapore', ID: 'Indonesia', TH: 'Thailand',
  PH: 'Philippines', VN: 'Vietnam', BN: 'Brunei', MM: 'Myanmar',
  KH: 'Cambodia', LA: 'Laos',
};

// supabase connection info for accessing the ransomware database
// these are read-only credentials to fetch the attack data
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * stat card component to display key metrics with emoji icons
 * shows things like total victims, monthly counts, etc.
 * can also show a description and source attribution
 */
const StatCard: React.FC<StatCardProps> = ({ emoji, label, count, source = 'US', description }) => {
  // pick the right emoji based on what type of stat this is
  const icon =
    label === 'Victims Since 2020' ? '⚔️' :
      label === 'This Month' ? '🌕' :
        label === 'This Year' ? '☀️' : emoji;

  return (
    <div className="stat-card">
      <div className="stat-card__emoji">{icon}</div>
      <h3 className="stat-card__title">{label}</h3>
      <p className="stat-card__value">{count}</p>
      {label === 'Victims Since 2020' && <p className="stat-card__source">Latest: {source}</p>}
      {description && <p className="stat-card__description">{description}</p>}
    </div>
  );
};

/**
 * helper function to figure out which week of the month a date falls in
 * this makes our heatmap labels more user-friendly
 */
const getWeekOfMonth = (d: Date) =>
  Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7);

/**
 * formats a date into "Month W#" format (like "Jan W1")
 * used as labels in our heatmap visualization
 */
const formatMonthWeek = (d: Date) =>
  `${months[d.getMonth()]} W${getWeekOfMonth(d)}`;

/**
 * generates all the weeks for a given year
 * this creates the structure for our heatmap even for weeks with no attacks
 * ensures consistent display with proper week numbering throughout the year
 */
const getAllWeeksInYear = (year: number): Week[] => {
  const weeks: Week[] = [];
  // start with the first sunday of the year (or last sunday of previous year)
  const curr = new Date(year, 0, 1);
  while (curr.getDay() !== 0) curr.setDate(curr.getDate() - 1);

  // keep adding weeks until we go past the end of the requested year
  while (curr.getFullYear() <= year) {
    const start = new Date(curr);
    const mid = new Date(curr);
    mid.setDate(mid.getDate() + 3); // use wednesday (day 3) as middle of week for more accurate month labeling since some weeks cross month boundaries
    curr.setDate(curr.getDate() + 6); // go to saturday to complete the week, needed to properly calculate week ranges
    const end = new Date(curr);

    // only include weeks that overlap with the requested year
    if (end.getFullYear() >= year && start.getFullYear() <= year) {
      weeks.push({
        start,
        end,
        label: formatMonthWeek(mid),
        month: mid.getMonth(),
        weekOfMonth: getWeekOfMonth(mid),
      });
    }
    curr.setDate(curr.getDate() + 1); // move to next sunday
  }
  return weeks;
};

/**
 * main component that fetches and displays ransomware attack data
 * includes stat cards and a visual heatmap of attack frequency
 */
const DataVis: React.FC = () => {
  // state to store the raw attack data and processed heatmap data
  const [ransomData, setRansomData] = useState<RansomwareAttack[]>([]);
  const [heatmapByMonth, setHeatmapByMonth] = useState<HeatmapByMonth>({});
  const [isLoading, setIsLoading] = useState(true);

  /**
   * extracts the most recent attack's country and formats it for display
   * helps show which country was most recently affected
   */
  const getLatestCountry = (data: RansomwareAttack[]) => {
    if (data.length === 0) return 'N/A';
    const code = data[0]?.country_code ?? 'Unknown';
    return countries[code] ?? code;
  };

  // fetch data when component loads
  useEffect(() => {
    // properly handle the promise with void operator
    void (async () => {
      const { data, error } = await supabase
        .from('asean_ransomware')
        .select('*')
        .order('published', { ascending: false });
      if (error) return console.error(error);
      if (data) {
        const rows = data as RansomwareAttack[];
        setRansomData(rows);
        processWeeklyData(rows);
      }
    })();
  }, []);

  /**
   * converts raw attack data into structured weekly heatmap format
   * organizes counts of attacks by week and month for the heatmap
   * adds placeholder weeks when needed for consistent display
   */
  const processWeeklyData = (data: RansomwareAttack[]) => {
    const year = new Date().getFullYear();
    const allWeeks = getAllWeeksInYear(year);

    // initialize counts for all weeks of the year
    const counts: Record<string, number> = {};
    allWeeks.forEach(wk => { counts[wk.label] = 0; });

    // count attacks for each week
    data.forEach(item => {
      const d = new Date(item.published);
      if (d.getFullYear() === year) {
        const key = formatMonthWeek(d);
        counts[key] = (counts[key] ?? 0) + 1;
      }
    });

    // organize the data by month for the heatmap
    const result: HeatmapByMonth = {};
    months.forEach(mn => {
      // find weeks for this month, sorted by week number, max 4 weeks per month
      const weeksForMonth = allWeeks.filter(wk => wk.label.startsWith(mn)).sort((a, b) => a.weekOfMonth - b.weekOfMonth).slice(0, 4);
      result[mn] = weeksForMonth.map(wk => ({
        label: `W${wk.weekOfMonth}`,
        count: counts[wk.label] ?? 0,
        fullLabel: wk.label,
        dates: `${wk.start.toLocaleDateString()} - ${wk.end.toLocaleDateString()}`,
      }));

      // add placeholder weeks if needed to ensure each month has 4 weeks
      while (result[mn].length < 4) {
        const idx = result[mn].length + 1;
        result[mn].push({
          label: `W${idx}`,
          count: 0,
          fullLabel: `${mn} W${idx}`,
          dates: 'No data',
          placeholder: true,
        });
      }
    });

    setHeatmapByMonth(result);
    setIsLoading(false);
  };

  /**
   * counts attacks for the current month only
   * used for the "this month" stat card
   */
  const getThisMonthCount = (data: RansomwareAttack[]) =>
    data.filter(i => {
      if (!i.published) return false;
      const d = new Date(i.published);
      return (
        d.getMonth() === new Date().getMonth() &&
        d.getFullYear() === new Date().getFullYear()
      );
    }).length;


  /**
   * counts attacks for the current year only
   * used for the "this year" stat card
   */
  const getThisYearCount = (data: RansomwareAttack[]) =>
    data.filter(i => new Date(i.published).getFullYear() === new Date().getFullYear()).length;

  /**
   * determines the css class to apply based on attack count
   * creates the color gradient for the heatmap visualization from css files
   */
  const getWeekLevelClass = (count: number) => {
    if (count === 0) return 'week-empty';
    if (count > 10) return 'week-level-4';
    if (count > 5) return 'week-level-3';
    if (count > 2) return 'week-level-2';
    return 'week-level-1';
  };

  /**
   * renders the main heatmap visualization
   * this function creates the visual calendar grid showing attack frequency
   * 
   * the heatmap is organized as:
   * - two rows of months (jan-jun and jul-dec) for better screen space usage
   * - each month shows 4 weeks as colored boxes
   * - each week box is colored based on attack count
   */
  const renderHorizontalHeatmap = () => {
    // split 12 months into two rows of 6 for better layout on different screen sizes
    const firstRow = months.slice(0, 6);    // jan through jun
    const secondRow = months.slice(6);     // jul through dec

    return (
      <>
        {/* create two separate rows of months */}
        {[firstRow, secondRow].map((row, idx) => (
          <div key={idx} className="heatmap-row">
            {/* for each month in this row */}
            {row.map(mn => (
              <div key={mn} className="month-container">
                {/* display month name at top */}
                <div className="month-label">{mn}</div>

                {/* container for all weeks in this month */}
                <div className="weeks-container">
                  {/* get weeks for this month or use empty array if none found */}
                  {/* each month should have exactly 4 weeks (real or placeholder) */}
                  {(heatmapByMonth[mn] ?? []).map((wk, i) => (
                    <div key={i}>
                      {/* the colored box representing a week */}
                      {/* color depends on number of attacks via css class */}
                      <div
                        className={`week-box ${getWeekLevelClass(wk.count)}`}
                        data-tooltip-id="heatmap-tooltip"
                        data-tooltip-content={`${wk.fullLabel}: ${wk.count} attacks`}
                        data-tooltip-place="top"                  // ← ensure it shows above
                      />
                      {/* label below each box (W1, W2, etc) */}
                      <div className="week-label">{wk.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  /**
   * main render function for the entire component
   * includes title, stat cards, heatmap
   */
  return (
    <div className="data-vis-container">
      <Tooltip id="heatmap-tooltip" />
      {/* main title banner with warning emoji, had to use inline styling to force a specific style */}
      <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-6xl w-full text-[#5b4636]">
        <h1
          style={{
            display: 'block',
            width: 'full',
            margin: '0.5rem auto 0',
            // backgroundColor: 'rgba(255,255,255,0.75)',
            padding: '0.5rem 0.5rem',
            borderRadius: '0.25rem',
          }}
          className="text-4xl text-[#5b4636] text-center tracking-wide uppercase"
        >
          ⚠️ASEAN RANSOMWARE ATTACKS⚠️
        </h1>

        {/* stats section with three key metrics about attacks */}
        <div className="card-container">
          <StatCard emoji="🌕" label="This Month" count={getThisMonthCount(ransomData)} description="Ransomware attacks reported in ASEAN this month" />
          <StatCard emoji="⚔️" label="Victims Since 2020" count={ransomData.length} source={getLatestCountry(ransomData)} />
          <StatCard emoji="☀️" label="This Year" count={getThisYearCount(ransomData)} description="Ransomware incidents recorded across ASEAN in 2025" />
        </div>
      </div>
      {/* heatmap visualization section */}
      <div className="heatmap-section bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-6xl w-full text-[#5b4636]">
        {/* section title for the heatmap */}
        <h3
          style={{
            display: 'block',
            width: 'fit-content',
            margin: '1rem auto 0',
            backgroundColor: 'rgba(44,28,15,0.85)',
            color: '#f8f1e7',
            padding: '0.5rem 0.5rem',
            borderRadius: '0.25rem',
          }}
          className="text-4xl tracking-wide uppercase"
        >
          🏹 Weekly Attack Heatmap 🏹
        </h3>

        {/* loading state or rendered heatmap */}
        {isLoading ? (
          <p className="intro-text">loading heatmap data...</p>
        ) : (
          <div className="heatmap-wrapper">
            {renderHorizontalHeatmap()}
            <Tooltip id="heatmap-tooltip" />

            {/* data source attribution with link */}
            <p
              style={{
                textAlign: 'center',
                marginTop: '1rem',
                fontSize: '14px',
                color: '#dcdcdc',
                fontStyle: 'italic',
              }}
            >
              Live data sourced from{' '}
              <a
                href="https://ransomware.live"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffd966', textDecoration: 'underline' }}
              >
                Ransomware.live
              </a>
            </p>
          </div>
        )}

        {/* animated intro text to introduce ransomware */}
        <p className="intro-text animated-text animated-delay-1">
          <a href="https://www.youtube.com/shorts/QHguF0rWamc" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#c25d5d', fontWeight: 'bold' }}>
            Ransomware
          </a> is just one threat in Southeast Asia&apos;s growing cybercrime landscape.
        </p>
        <p className="highlight-text animated-text animated-delay-2">
          But what about the others?
        </p>
        <p className="call-text animated-text animated-delay-3">
          Step into our interactive story with real Malaysian cybercrime data so you can better:
        </p>

        {/* benefits list that shows what users will gain */}
        <div className="benefits-container">
          <div className="benefit-item">🔍 Spot Danger</div>
          <div className="benefit-item">🧠 Make Choices</div>
          <div className="benefit-item">🛡️ Level Up</div>
        </div>
      </div>

      {/* navigation component that helps users move to next screen */}
      <div className="bg-[#fdf6e3] border-4 border-[#5b4636] rounded-2xl p-8 shadow-lg max-w-6xl w-full text-[#5b4636]" style={{ marginTop: '2rem' }}><SwipeRight /></div>
    </div>
  );
};

export default DataVis;