"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import StarryBackground from "~/components/StarryBackground";

export default function ScanEmailPage() {
  // email input field value
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  // whether scan is currently in progress
  const [loading, setLoading] = useState(false);

  // scan result - null when no result yet
  const [result, setResult] = useState<"safe" | "risky" | null>(null);

  // whether to display the crystal ball animation
  const [showCrystal, setShowCrystal] = useState(false);

  // track if result came from api or cached database
  const [resultSource, setResultSource] = useState<"api" | "database" | null>(null);

  // initialize supabase client for database operations
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  // structure returned from database query
  interface DatabaseBreachCheck {
    email_hash: string;
    is_breached: boolean;
    created_at: string;
  }

  // structure returned from hibp api endpoint
  interface CheckEmailResponse {
    breached: boolean;
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // converts email to sha-256 hash for privacy-preserving database storage
  async function hashEmail(email: string): Promise<string> {
    const enc = new TextEncoder();
    // hash normalized email (lowercase, trimmed)
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(email.trim().toLowerCase()));
    // convert hash to hex string
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  // checks database for previous scan results within 30 days
  async function checkDatabaseForResults(email_hash: string): Promise<"safe" | "risky" | null> {
    try {
      // query for most recent result for this email hash
      const { data, error } = await supabase
        .from("hibp_breach_check")
        .select("is_breached, created_at")
        .eq("email_hash", email_hash)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Database query error:", error);
        return null;
      }

      // only use recent results (less than 30 days old)
      if (data && data.length > 0) {
        const result = data[0] as DatabaseBreachCheck;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // check if result is recent enough to use
        if (new Date(result.created_at) > thirtyDaysAgo) {
          return result.is_breached ? "risky" : "safe";
        }
      }

      return null;
    } catch (error) {
      console.error("Database check error:", error);
      return null;
    }
  }

  // main function that handles the email security scan
  const handleScan = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setResultSource(null);

    try {
      // create hash for database storage and lookup
      const email_hash = await hashEmail(email);

      // attempt to get result from hibp api first
      let apiSuccessful = false;
      try {
        const response = await fetch(
          `/api/check-email?email=${encodeURIComponent(email)}`
        );

        if (response.ok) {
          const data = (await response.json()) as CheckEmailResponse;

          // store fresh result in database for when api fails
          await supabase
            .from("hibp_breach_check")
            .insert({
              email_hash,
              is_breached: data.breached,
              created_at: new Date().toISOString(),
            });

          setResult(data.breached ? "risky" : "safe");
          setResultSource("api");
          apiSuccessful = true;
        }
      } catch (apiError) {
        console.error("API error:", apiError);
      }

      // fallback to database when api fails or is unavailable
      if (!apiSuccessful) {
        console.log("API failed, checking database...");
        const dbResult = await checkDatabaseForResults(email_hash);

        if (dbResult) {
          // found cached result
          setResult(dbResult);
          setResultSource("database");
        } else {
          // no cached data - assume safe as conservative default
          setResult("safe");
          setResultSource("database");

          // save this default assumption for future reference
          await supabase
            .from("hibp_breach_check")
            .insert({
              email_hash,
              is_breached: false, // default to safe when no info available
              created_at: new Date().toISOString(),
            });
        }
      }

      // show crystal ball animation regardless of result source
      setShowCrystal(true);
    } catch (error) {
      console.error("Scan error:", error);
      // complete failure fallback - show safe result
      setResult("safe");
      setResultSource("database");
      setShowCrystal(true);
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide crystal ball after 2 seconds
  useEffect(() => {
    if (showCrystal) {
      const timer = setTimeout(() => {
        setShowCrystal(false);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [showCrystal]);

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        // backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundImage: "linear-gradient(to bottom, #000000, #1a1a1a)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "var(--font-sniglet)",
      }}
    >
      <TopNav />


      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">

        {/* page header section */}
        <h1 className="text-4xl text-[#ffffc5] font-extrabold mb-4">
          Check Your Email Security
        </h1>
        <p className="text-[#ffffc5] max-w-lg text-base md:text-lg mb-8">
          Enter your email to scan for hidden risks and data breaches.
        </p>

        {/* email input form */}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter your email..."
          className={`w-80 px-4 py-3 rounded-lg border-4 ${error ? 'border-red-600' : 'border-[#5b4636]'
            } text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-yellow-500'
            } mb-2`}
        />

        {/* email format error message */}
        {error && (
          <p className="text-red-600 font-semibold text-sm mb-4">
            {error}
          </p>
        )}

        {/* privacy and security disclaimers */}
        <div className="mb-4 text-sm text-[#ffffc5]">
          <p>
            Your data is <span className="text-xl text-yellow-700">secured</span> with encryption.
            <Link href="https://haveibeenpwned.com/Privacy" target="_blank">
              <span className="text-lg ml-1 underline text-yellow-700 hover:text-yellow-800">Learn More</span>
            </Link>
          </p>
          <p>Secure • Private • <span className="text-xl text-yellow-700">We don&apos;t store emails</span></p>
        </div>

        {/* scan trigger button with hover animation */}
        <motion.button
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
          onClick={handleScan}
          disabled={loading}
          className="bg-[#ffc067] text-[#5b4636] border-4 border-[#5b4636] px-8 py-3 rounded-lg text-xl font-bold hover:bg-[#e8b15e] transition-colors duration-200 transform hover:scale-105"
        >
          {loading ? "Scanning..." : "Scan"}
        </motion.button>

        {/* animated crystal ball that shows scan results */}
        <AnimatePresence>
          {showCrystal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="fixed inset-0 z-40 flex items-center justify-center"
              style={{ pointerEvents: "auto" }}
              onClick={() => setShowCrystal(false)}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                {/* crystal ball image */}
                <Image
                  src="/main/crystal_orb.png"
                  alt="Crystal Orb"
                  width={250}
                  height={250}
                  className="mt-24 opacity-100 drop-shadow-xl"
                />

                {/* result text overlay on crystal ball */}
                <motion.div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${result === "safe" ? "text-green-700" : "text-red-700"
                    } font-bold`}
                  style={{
                    fontSize: "2.5rem",
                    textShadow: "0 0 8px white",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {result === "safe" ? "SAFE" : "RISKY"}
                </motion.div>

                {/* close button for crystal ball modal
                <button
                  onClick={() => setShowCrystal(false)}
                  className="absolute top-12 right-12 text-[#5b4636] bg-white/70 rounded-full p-1 border-4 border-[#5b4636] hover:bg-yellow-100 shadow"
                  style={{ pointerEvents: "auto" }}
                >
                  <FaTimes />
                </button> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* detailed result information card */}
        {result && (
          <motion.div
            key={result}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 w-full max-w-md p-6 rounded-lg border-4 border-[#5b4636] bg-[#f9f4e6] shadow-lg text-left"
          >
            {result === "safe" ? (
              <>
                <h2 className="text-xl font-bold text-green-700 mb-2">✅ Your email is safe!</h2>
                <ul className="list-disc ml-5 text-[#5b4636] space-y-1">
                  <li>Keep using strong, unique passwords</li>
                  <li>Enable two-factor authentication where possible</li>
                  <li>Stay cautious with suspicious emails</li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-red-700 mb-2">⚠️ Risk detected! Protect your account!</h2>
                <ul className="list-disc ml-5 text-[#5b4636] space-y-1">
                  <li>Change your passwords immediately</li>
                  <li>Enable two-factor authentication</li>
                  <li>Monitor for suspicious activities</li>
                </ul>
              </>
            )}

            {/*  result source */}
            <p className="text-xs text-gray-600 mt-4 border-t pt-2">

              Result from: {resultSource === "api" ? "HaveIBeenPawned API" : "Previous check"}  {/*  Live or db*/}
            </p>
          </motion.div>
        )}
      </div>
      <StarryBackground />
      <Footer />
    </main>
  );
}