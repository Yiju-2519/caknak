'use client';

import React from 'react';
import PhishingSimulator from '~/app/_components/phishing-sim';
import { motion } from 'framer-motion';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';
import FlipCard from '~/components/FlipCard';
import StarryBackground from "~/components/StarryBackground";

/**
 * data structure for tipu cards
 * each card represents a warning sign with a letter and explanation
 * the acronym tipu translates to "lie" in bahasa malaysia
 * these cards help users identify common phishing tactics
 */
const tipuData = [
  {
    letter: 'T',
    malay: 'Too good to be true',
  },
  {
    letter: 'I',
    malay: 'Immediate action required',
  },
  {
    letter: 'P',
    malay: 'Promised guaranteed profits',

  },
  {
    letter: 'U',
    malay: 'Unbelievable rewards',

  },
];

/**
 * main page component for the decode danger feature
 * offers an interactive phishing simulator and educational content
 * designed to teach users how to identify and avoid scams
 * includes animated elements for engaging user experience
 */
export default function DecodeDangerPage() {

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        // backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundImage: "linear-gradient(to bottom, #000000, #1a1a1a)",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'var(--font-sniglet)',
      }}
    >
      {/* navigation component at the top of the page */}
      <TopNav />

      {/* main content section with all educational materials */}
      <section className="p-8">
        <div className="text-center">
          {/* attention-grabbing header with animation and link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="bg-[#fefce8] border border-[#5b4636] px-8 py-6 mt-8 rounded-xl shadow-md max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl text-[#5b4636] font-extrabold mb-4 text-center">
              🎓 Scholarship grants are{' '}
              <a
                href="https://www.investopedia.com/financial-edge/1012/common-scams-targeted-at-teens.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#D6AD69] transition-colors"
              >
                top 5
              </a>{' '}
              most common targeted at teens
            </h2>

            <p className="text-md md:text-lg text-[#5b4636] text-center">
              Try our <strong>Phishing Simulator</strong> 🎣 to know if you can evade it!
            </p>
          </motion.div>

          {/* three-panel layout for simulator and help content */}
          <div className="mt-12 flex flex-col md:flex-row gap-16 justify-center items-stretch">
            {/* left panel with numbered instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#8F6854] border-2 border-[#DDA175] p-5 rounded-xl shadow-md md:w-64 flex flex-col"
            >
              <h3 className="text-xl text-[#ffffff] font-bold mb-4 text-center">Steps to use</h3>
              <ol className="text-[#FEEAD3] text-left space-y-3 flex-grow">

                {/* step 1 - start conversation */}
                <li className="flex items-start justify-between">
                  <span className="font-bold mr-2">1.</span>
                  <span className="text-justify flex-1">Start a conversation with the fake scholarship officer</span>
                </li>

                {/* step 2 - personal details request */}
                <li className="flex items-start justify-between">
                  <span className="font-bold mr-2">2.</span>
                  <span className="text-justify flex-1">They&apos;ll ask for your personal details</span>
                </li>

                {/* step 3 - decide what to share */}
                <li className="flex items-start justify-between">
                  <span className="font-bold mr-2">3.</span>
                  <span className="text-justify flex-1">Decide how much information to share. Feel free to make up fake names and info to simulate your response safely</span>
                </li>

                {/* step 4 - get feedback */}
                <li className="flex items-start justify-between">
                  <span className="font-bold mr-2">4.</span>
                  <span className="text-justify flex-1">After 3 messages, you&apos;ll get feedback on how well you did</span>
                </li>
              </ol>

              {/* privacy notice at bottom of instructions */}
              <div className="mt-4 text-center">
                <span className="text-sm italic text-[#FEEAD3]">This simulator uses AI to evaluate your responses. No data is stored.</span>
              </div>
            </motion.div>

            {/* center panel containing the actual simulator component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-[420px]"
            >
              <PhishingSimulator />
            </motion.div>

            {/* right panel with educational tipu flip cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#8F6854] border-2 border-[#DDA175] p-5 rounded-xl shadow-md md:w-64 flex flex-col"
            >
              <h3 className="text-xl text-[#ffffff] font-bold mb-4 text-center">🚨Warning Signs🚨</h3>
              <h5 className="text-m text-[#e9a95f] font-bold mb-4 text-center">TIPU means LIE in Bahasa Malaysia!</h5>

              {/* container for the interactive flip cards */}
              <div className="flex flex-col items-center space-y-8">
                {/* map through the tipu data to create a card for each item */}
                {tipuData.map((item) => (
                  <FlipCard
                    key={item.letter}
                    frontContent={
                      <div className="bg-[#e9a95f] rounded-xl flex items-center justify-center w-full h-full">
                        <span className="text-white text-5xl font-bold">{item.letter}</span>
                      </div>
                    }
                    backContent={
                      <div className="bg-[#f0b574] rounded-xl flex flex-col items-center justify-center p-3 w-full h-full">
                        <p className="text-[#5b4636] font-semibold text-sm leading-tight">{item.malay}</p>
                      </div>
                    }
                  />
                ))}

                {/* user instruction for the flip cards */}
                <div className="text-center text-[#FEEAD3] text-sm italic mt-2">
                  <p>Hover over each letter to see details</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* bottom info box with safety tips and reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-3xl mx-auto bg-[rgba(254,252,232,0.9)] border border-[#5b4636] p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl text-[#5b4636] font-bold mb-2">Stay Safe from Phishing Scams</h3>
            <p className="text-[#5b4636] mb-4">
              Remember, legitimate organizations will never pressure you to share personal information through casual messages. Always verify the sender through official channels before sharing any personal details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* spacer to push footer to bottom */}
      <div className="flex-grow" />
      
      {/* page footer component */}
      <Footer />
      <StarryBackground />
    </main>
    
  );
}