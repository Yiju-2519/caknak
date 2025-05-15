'use client';

import React from 'react';
import DataVis from '~/app/_components/data-vis-ransomware';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';
import StarryBackground from '~/components/StarryBackground';

export default function DecodeDangerPage() {
  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/textures/parchment-texture.png')",
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
          <h1 className="text-4xl font-extrabold text-[#ffc067] mb-2">
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
      <Footer />
    </main>
  );
}