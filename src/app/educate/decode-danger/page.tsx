'use client';

import React from 'react';
import DataVis from '~/app/_components/data-vis-ransomware';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';
import StarryBackground from '~/components/StarryBackground';
import { FaArrowUp } from 'react-icons/fa';

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
      <TopNav />
      <StarryBackground />

      {/* page content */}
      <section className="p-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ffc067] flex items-center justify-center gap-2">
            <img src="/main/guardian_book.png" alt="Cyber Heroes" className="w-15 h-20 inline-block" />
            Decode the Danger
          </h1>
          <p className="text-lg text-[#ffc067] mb-6 max-w-xl mx-auto">
            Decode digital threats through real-world data and an interactive
            story adventure.
          </p>
        </div>

        {/* import ransomware dashboard and data-story telling*/}
        <div className="mt-6">
          {/* pull in the ransomware data visualization component from the data-vis-ransomware */}
          <DataVis />
        </div>


      </section>

      <div className="flex-grow" />

      <button className="fixed bottom-4 right-4 bg-white text-white p-2 rounded-full shadow-lg hover:bg-gray-300 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FaArrowUp className="text-gray-800 text-2xl" />
      </button>

      <StarryBackground />
      <Footer />
    </main>
  );
}