"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import StarryBackground from "~/components/StarryBackground";

export default function Home() {
  // tracks which card is currently flipped to show its submenu
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // main sections that appear as flip cards on the home page
  // each has a title, icon, and submenu with various features
  const sections = [
    {
      id: "check",
      title: "CHECK",
      icon: "/main/crystal_orb.png",
      submenu: [
        { 
          label: "🔍 Scan Email", 
          href: "/check/scan-email", 
          description: "Verify if your email has been breached" 
        },
        { 
          label: "🔍 Phishing Detection", 
          href: "/check/phishing-detection", 
          description: "Tools to identify phishing attempts" 
        },
        { 
          label: "🔍 Password Checker", 
          href: "/check/password-checker", 
          description: "Check the strength of your password" 
        },
      ],
    },
    {
      id: "educate",
      title: "EDUCATE",
      icon: "/main/guardian_book.png",
      submenu: [
        { 
          label: "🕯️ Recovery Steps", 
          href: "/educate/recovery-steps", 
          description: "Step - by - step on info leak response, account security & loss prevention" 
        },
        { 
          label: "🕯️ Phishing Prevention", 
          href: "/educate/phishing-prevention", 
          description: "Learn phishing trap ID, anti - fraud skills, secure personal info" 
        },
        { 
          label: "🕯️ Decode Danger", 
          href: "/educate/decode-danger", 
          description: "Explore real threats through data and story" 
        },
      ],
    },
    {
      id: "test",
      title: "TEST",
      icon: "/main/magic_feather2_ink.png",
      submenu: [
        { 
          label: "📜 Phishing Simulator", 
          href: "/test/phishing-simulator", 
          description: "Immerse yourself" 
        },
        { 
          label: "📜 Security Quiz", 
          href: "/test/security-quiz", 
          description: "Test your security knowledge" 
        },
      ],
    },
  ];

  // toggles card flip animation when clicking on a card
  // if card is already flipped, it will flip back
  const handleCardClick = (id: string) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  return (
    <main
      className="min-h-screen flex flex-col relative"
      style={{
        // backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundImage: "linear-gradient(to bottom, #000000, #1a1a1a)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "var(--font-sniglet)",
      }}
    >
      {/* navigation bar at top */}
      <TopNav />
      
      {/* animated starry background effect */}
      <StarryBackground />

      {/* main content area with flip cards */}
      <section className="flex-grow pt-20 pb-6 relative z-10">
        {/* responsive grid that adjusts columns based on screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 place-items-center">
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative w-64 h-96 cursor-pointer perspective-1000 group z-10"
            >
              {/* 3D flip animation container */}
              <motion.div
                className="relative w-full h-full transition-transform duration-[0.1s]"
                animate={{ rotateY: flippedCard === section.id ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front side of card */}
                <div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg bg-[#1b0e37] bg-cover bg-center overflow-hidden border-4 border-[#f3e9d2] hover:scale-105 transition-transform duration-200 hover:border-[#ffc067] hover:shadow-[0_0_20px_#ffc067]"
                  style={{
                    backfaceVisibility: "hidden",  // hides front when flipped
                    pointerEvents: flippedCard === section.id ? "none" : "auto",
                  }}
                  onClick={() => handleCardClick(section.id)}
                >
                  {/* Tarot-style decorative border elements */}
                  <div className="absolute inset-0 border-[#f3e9d2] opacity-40 pointer-events-none">
                    {/* Inner decorative frame */}
                    <div className="absolute inset-4 border border-[#f3e9d2] rounded-lg"></div>
                    
                    {/* Ornamental corners */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#f3e9d2] rounded-tl-md"></div>
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#f3e9d2] rounded-tr-md"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#f3e9d2] rounded-bl-md"></div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#f3e9d2] rounded-br-md"></div>
                    
                    {/* Decorative center lines */}
                    <div className="absolute top-1/2 left-3 right-3 h-px bg-[#f3e9d2] opacity-30 transform -translate-y-16"></div>
                    <div className="absolute top-1/2 left-3 right-3 h-px bg-[#f3e9d2] opacity-30 transform translate-y-16"></div>
                    
                    {/* Dotted decorative elements */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-px">
                      <div className="flex justify-between">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-[#f3e9d2] opacity-50"></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-px">
                      <div className="flex justify-between">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-[#f3e9d2] opacity-50"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mystical symbols in background */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute top-1/4 left-1/4 text-xs text-[#f3e9d2]">✧</div>
                    <div className="absolute top-1/4 right-1/4 text-xs text-[#f3e9d2]">⁎</div>
                    <div className="absolute bottom-1/4 left-1/4 text-xs text-[#f3e9d2]">⁂</div>
                    <div className="absolute bottom-1/4 right-1/4 text-xs text-[#f3e9d2]">✧</div>
                  </div>
                  
                  {/* title at top of card */}
                  <h3
                    className="absolute top-4 w-full text-center text-4xl font-bold"
                    style={{ color: "#e7d9bd" }}
                  >
                    {section.title}
                  </h3>
                  
                  {/* spinning runic circle background */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-90 h-90 bg-center bg-no-repeat bg-contain opacity-60 -translate-x-1/2 -translate-y-1/2"
                    style={{ backgroundImage: "url('/textures/rune-circle-removebg.png')" }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  />
                  
                  {/* main section icon (crystal orb, book, or feather) */}
                  <div className="z-10">
                    <Image src={section.icon} alt={section.title} width={90} height={90} />
                  </div>
                  
                  {/* title at bottom of card (mirrors the top) */}
                  <h3
                    className="absolute bottom-4 w-full text-center text-4xl font-bold"
                    style={{ color: "#e7d9bd" }}
                  >
                    {section.title}
                  </h3>

                  {/* Decorative pentagram in the background */}
                  <svg 
                    className="absolute opacity-10 pointer-events-none"
                    width="180" 
                    height="180" 
                    viewBox="0 0 100 100" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <path 
                      d="M50 0 L61 35 L97 35 L68 57 L79 90 L50 70 L21 90 L32 57 L3 35 L39 35 Z" 
                      fill="none" 
                      stroke="rgba(243, 233, 210, 0.5)" 
                      strokeWidth="0.5">
                    </path>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="rgba(243, 233, 210, 0.3)" 
                      strokeWidth="0.5">
                    </circle>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="35" 
                      fill="none" 
                      stroke="rgba(243, 233, 210, 0.2)" 
                      strokeWidth="0.5">
                    </circle>
                  </svg>
                </div>

                {/* back side of card with submenu options */}
                <div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg bg-[#f3e9d2] transform rotate-y-180 overflow-hidden px-4"
                  style={{ backfaceVisibility: "hidden" }}  // hides back when front is visible
                >
                  {/* Decorative elements for back of card */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Inner frame */}
                    <div className="absolute inset-4 border border-[#5b4636] opacity-40 rounded-lg"></div>
                    
                    {/* Ornamental corners */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#5b4636] opacity-60 rounded-tl-md"></div>
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#5b4636] opacity-60 rounded-tr-md"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#5b4636] opacity-60 rounded-bl-md"></div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#5b4636] opacity-60 rounded-br-md"></div>
                  </div>
                  
                  {/* list of clickable submenu items */}
                  {section.submenu.map((item, idx) => (
                    <button
                      key={idx}
                      className="mb-4 text-[#5b4636] hover:bg-[#fadc98] hover:scale-105 hover:shadow-[0_0_20px_#f5d87d] p-2 rounded cursor-pointer w-full transition"
                      onClick={(e) => {
                        e.stopPropagation();  // prevents card from flipping when clicking submenu
                        window.location.href = item.href;  // navigates to selected page
                      }}
                    >
                      {/* submenu item title with emoji and optional badge */}
                      <h4 className="font-semibold text-lg flex items-center justify-center gap-1 whitespace-nowrap">
                        {item.label}
                        {/* empty span element for potential badges or indicators */}
                        <span
                          className="ml-2 text-sm text-yellow-700 font-bold"
                          style={{ fontFamily: "'Great', cursive" }}
                        >
                        
                        </span>
                      </h4>
                      {/* description text under each submenu item */}
                      <p className="text-sm">{item.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* spacer element to push footer to bottom */}
      <div className="flex-grow" />
      
      {/* footer at bottom of page */}
      <Footer />
    </main>
  );
}