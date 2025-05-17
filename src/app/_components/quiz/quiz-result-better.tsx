import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
 

export default function QuizResultCardBetter() {
  return (
  
    <div className="flex flex-col items-center">
   
      <div
        className="w-64 h-96 bg-[#f3e9d2] border-4 border-[#5b4636] rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/textures/bg-result-quiz.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/*animation for image */}
        <motion.div
          className="w-60 h-60 mb-4 flex justify-center items-center absolute"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image src="/quiz/resultbad.png" alt="Better Result Icon" width={400} height={400} />
        </motion.div>
        
        <p className="text-[#ffc067] text-lg font-semibold z-10 mt-75">Youll get there!</p>
        <p className="text-[#ffffff] text-sm">Every Click is a Lesson, Keep Learning!</p>
      </div>

      {/* putside text */}
      <div className="mt-4">
        <p className="text-[black] text-base font-bold ">Learning takes time, and every step you take is a step closer to mastering cyber defenses.</p>
        <p className="text-[black] text-sm font-semibold">Keep exploring, keep questioning, and keep growing.</p>
        <p className="text-[black] text-sm font-semibold ">Youre building strong foundations one click at a time.</p>
      </div>

    </div>
  );
}