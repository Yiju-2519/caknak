'use client';

import React, { useState } from 'react';
import Image from "next/image";

// Define the choice type
interface Choice {
  id: number;
  label: string;
  icon: string;
  text: string;
}

// Props interface
interface Question6 {
  questionId: string;
  questionText?: string;
  choices?: Choice[];
  onAnswer: (questionId: string, choiceId: number) => void;
}

export default function Question4({ 
  questionId, 
  questionText = "Q6",
  choices = [
    {
      id: 1,
      label: "📞 Hang Up Immediately",
      icon: "/quiz/great_job_quiz.svg",
      text: "lorem ipsum"
    },
    {
      id: 2,
      label: "💳 Provide the Details",
      icon: "/quiz/do_better_quiz.svg",
      text: "lorem ipsum"
    }
  ],
  onAnswer 
}: Question6) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // Handle choice selection
  const handleChoice = (choiceId: number) => {
    setSelectedChoice(choiceId);
    // Send choice to main page
    onAnswer(questionId, choiceId);
  };

  // Get choices with fallback to empty array
  const choice1 = choices[0];
  const choice2 = choices[1];

  if (!choice1 || !choice2) {
    return <div>Error: Invalid choices provided</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Question Text - Outside the card */}
      <h2 className="text-[#ffc067] text-2xl font-bold mb-4 text-center">{questionText}</h2>
      
      {/* Card with Choices and Side Labels */}
      <div className="relative flex items-center gap-6">
        {/* Left Label */}
        <div className="text-right mb-50">
          <p className="text-[#ffc067] text-xl font-bold">
            {choice1.label}
          </p>
        </div>
        
        {/* Card with Choices */}
        <div 
          className="w-64 h-96 bg-[#f3e9d2] border-4 border-[#5b4636] rounded-xl flex flex-col relative overflow-hidden"
          style={{
            backgroundImage: "url('/textures/rune-circle-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Horizontal Divider */}
          <div className="absolute left-8 right-8 top-1/2 h-1 bg-[#5b4636] transform -translate-y-1/2 z-10" />

          {/* Choice 1 - Top Half */}
          <div 
            className="absolute top-4 left-0 right-0 bottom-1/2 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] transition-all duration-300"
            onClick={() => handleChoice(choice1.id)}
          >
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="w-24 h-24 mb-2">
                <Image src={choice1.icon} alt={choice1.label} width={96} height={96} />
              </div>
              <p className="text-[#5b4636] text-sm text-center mt-1">{choice1.text}</p>
            </div>
            {selectedChoice === choice1.id && (
              <div className="absolute inset-0 bg-yellow-100 opacity-20 rounded-t-lg" />
            )}
          </div>

          {/* Choice 2 - Bottom Half */}
          <div 
            className="absolute bottom-0 left-0 right-0 top-1/2 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] transition-all duration-300"
            onClick={() => handleChoice(choice2.id)}
          >
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="w-24 h-24 mb-2">
                <Image src={choice2.icon} alt={choice2.label} width={96} height={96} />
              </div>
              <p className="text-[#5b4636] text-sm text-center mt-1">{choice2.text}</p>
            </div>
            {selectedChoice === choice2.id && (
              <div className="absolute inset-0 bg-yellow-100 opacity-20 rounded-b-lg" />
            )}
          </div>

          {/* Selection border */}
          {selectedChoice && (
            <div className="absolute inset-0 border-4 border-yellow-100 rounded-xl pointer-events-none z-30 transition-opacity duration-300" />
          )}
        </div>
        
        {/* Right Label */}
        <div className="text-left mt-50">
          <p className="text-[#ffc067] text-xl font-bold">
            {choice2.label}
          </p>
        </div>
      </div>
    </div>
  );
}