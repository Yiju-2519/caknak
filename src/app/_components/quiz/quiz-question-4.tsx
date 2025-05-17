'use client';

import React, { useState } from 'react';
import Image from "next/image";

// choice type
interface Choice {
  id: number;
  label: string;
  icon: string;

}

// props interface
interface Question4Props {
  questionId: string;
  questionText?: string;
  choices?: Choice[];
  onAnswer: (questionId: string, choiceId: number) => void;
}

export default function Question4({ 
  questionId, 
  questionText = "Q4",
  choices = [
    {
      id: 1,
      label: "🛠️ Insert and Check Contents",
      icon: "/quiz/Q4A.png",

    },
    {
      id: 2,
      label: "🚷 Hand it to your teacher",
      icon: "/quiz/Q4B.png",

    }
  ],
  onAnswer 
}: Question4Props) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // handle choice selection
  const handleChoice = (choiceId: number) => {
    setSelectedChoice(choiceId);
    onAnswer(questionId, choiceId);
  };

  // get choices or fallback to empty array
  const choice1 = choices[0];
  const choice2 = choices[1];

  if (!choice1 || !choice2) {
    return <div>error: invalid choices provided</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* question text - outside the card */}
      <h2 className="text-[#5b4636] text-2xl font-bold mb-4 text-center">{questionText}</h2>
      
      {/* card with choices and side labels */}
      <div className="relative flex items-center gap-6">
        {/* left label */}
        <div className="text-right mb-50">
          <p className="text-[#5b4636] text-xl font-bold">{choice1.label}</p>
        </div>
        
        {/* card with choices */}
        <div 
          className="w-64 h-96 bg-[#f3e9d2] border-4 border-[#5b4636] rounded-xl flex flex-col relative overflow-hidden"
          style={{
            backgroundImage: "url('/textures/quiz_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* horizontal divider */}
          <div className="absolute left-8 right-8 top-1/2 h-1 bg-[#5b4636] transform -translate-y-1/2 z-10" />

          {/* choice 1 - top half */}
          <div 
            className="absolute top-4 left-0 right-0 bottom-1/2 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] transition-all duration-300"
            onClick={() => handleChoice(choice1.id)}
          >
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="w-50 h-50 mb-0">
                <Image src={choice1.icon} alt={choice1.label} width={360} height={360} />
              </div>
            </div>
          </div>

          {/* choice 2 - bottom half */}
          <div 
            className="absolute bottom-0 left-0 right-0 top-1/2 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] transition-all duration-300"
            onClick={() => handleChoice(choice2.id)}
          >
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="w-55 h-55 mt-4">
                <Image src={choice2.icon} alt={choice2.label} width={360} height={360} />
              </div>
            </div>
          </div>

          {/* selection border */}
          {selectedChoice && (
            <div className="absolute inset-0 border-4 border-yellow-100 rounded-xl pointer-events-none z-30 transition-opacity duration-300" />
          )}
        </div>

        {/* right label */}
        <div className="text-left mt-50">
          <p className="text-[#5b4636] text-xl font-bold">{choice2.label}</p>
        </div>
      </div>
    </div>
  );
}
