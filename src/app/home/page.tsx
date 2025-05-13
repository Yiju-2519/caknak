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
        backgroundImage: "url('/textures/parchment-texture.png')",
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
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg border-4 border-[#f3e9d2] bg-[url('/textures/rune-circle-bg.png')] bg-cover bg-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",  // hides front when flipped
                    pointerEvents: flippedCard === section.id ? "none" : "auto",
                  }}
                  onClick={() => handleCardClick(section.id)}
                >
                  {/* title at top of card */}
                  <h3
                    className="absolute top-4 w-full text-center text-5xl font-bold"
                    style={{ color: "#ffc067" }}
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
                    style={{ color: "#ffc067" }}
                  >
                    {section.title}
                  </h3>
                </div>

                {/* back side of card with submenu options */}
                <div
                  className="absolute w-full h-full flex flex-col justify-center items-center text-center rounded-xl shadow-lg bg-[#f3e9d2] border-4 border-[#5b4636] transform rotate-y-180 overflow-hidden px-4"
                  style={{ backfaceVisibility: "hidden" }}  // hides back when front is visible
                >
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