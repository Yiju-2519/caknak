'use client';

import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuizResultCardBetter() {
  return (
    <div 
      className="w-64 h-96 bg-[#f3e9d2] border-4 border-[#5b4636] rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/textures/rune-circle-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SVG Icon */}
      <motion.div 
        className="w-60 h-60 mb-4 flex justify-center items-center absolute"
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image src="/quiz/do_better_quiz.svg" alt="Result Icon" width={400} height={400} />
      </motion.div>

      <p className="text-[#5b4636] text-lg font-semibold z-10 mt-70">Youll get there!</p>
    </div>
  );
}

