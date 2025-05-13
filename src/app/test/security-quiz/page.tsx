'use client';

import React, { useState } from 'react';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';
import StarryBackground from '~/components/StarryBackground';
import QuizFlow from '~/app/_components/quiz/quiz-flow';

/**
 * Page wrapper component that orchestrates the quiz experience
 * Uses react key prop to trigger QuizFlow remounts on restart
 */
export default function DecodeDangerPage() {
  // key for forcing component remount - increments trigger full state reset
  const [quizKey, setQuizKey] = useState(0);
  
  // track whether quiz has started
  const [quizStarted, setQuizStarted] = useState(false);
  
  // callback triggered when quiz reaches completion state
  const handleQuizComplete = () => {
    // placeholder for analytics, database updates, etc
    console.log('Quiz completed!');
  };
  
  // increments key to trigger react remount lifecycle
  const handleQuizRestart = () => {
    // react will destroy and recreate QuizFlow when key changes
    setQuizKey(prev => prev + 1);
  };
  
  // handle start button click
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  
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
      {/* fixed navigation bar - not scoped to this page */}
      <TopNav />
      
      {/* hero section with page title and description */}
      <div className="text-center pt-10 pb-8">
        <h1 className="text-4xl font-extrabold text-[#ffc067] mb-1.5">
          Security Quiz
        </h1>
        <p className="text-lg text-[#ffc067] mb-6 max-w-xl mx-auto">
          Test your knowledge about online safety and security
        </p>
      </div>
      
      {/* conditionally render start screen or quiz with different layouts */}
      {quizStarted ? (
        /* quiz component with card background */
        <div className="flex-grow flex items-center justify-center px-4 pb-10">
          <div className="w-full max-w-4xl">
            <div className="bg-[#f3e9d2] border-4 border-[#5b4636] rounded-3xl p-8 shadow-xl">
              <QuizFlow 
                key={quizKey}  // forces complete component remount when changed
                onComplete={handleQuizComplete}
                onRestart={handleQuizRestart}
              />
            </div>
          </div>
        </div>
      ) : (
        /* start screen with plain layout */
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-[#f3e9d2] border-4 border-[#5b4636] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#5b4636] mb-4">
                Are you ready to test your cybersecurity knowledge?
              </h2>
              <p className="text-[#5b4636] mb-6">
                This quiz will challenge you with real-world scenarios to help you identify 
                potential security threats and learn best practices for staying safe online.
              </p>
              <ul className="text-left text-[#5b4636] mb-6 space-y-2">
                <li>• 5 multiple choice questions</li>
                <li>• Real security scenarios</li>
                <li>• Instant feedback on your answers</li>
                <li>• Learn as you go</li>
              </ul>
              <button
                onClick={handleStartQuiz}
                className="bg-[#ffc067] text-[#5b4636] border-4 border-[#5b4636] px-8 py-3 rounded-lg text-xl font-bold hover:bg-[#e8b15e] transition-colors duration-200 transform hover:scale-105"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
      
      <StarryBackground />
      
      {/* site-wide footer component */}
      <Footer />
    </main>
  );
}