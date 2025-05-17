'use client';

import React, { useState, useEffect } from 'react';
import QuizResultCardGood from '~/app/_components/quiz/quiz-result-good';
import QuizResultCardBetter from '~/app/_components/quiz/quiz-result-better';
import Question1 from '~/app/_components/quiz/quiz-question-1';
import Question2 from '~/app/_components/quiz/quiz-question-2';
import Question3 from '~/app/_components/quiz/quiz-question-3';
import Question4 from '~/app/_components/quiz/quiz-question-4';
import Question5 from '~/app/_components/quiz/quiz-question-5';
import Question6 from '~/app/_components/quiz/quiz-question-6';
import Question7 from '~/app/_components/quiz/quiz-question-7';
import Question8 from '~/app/_components/quiz/quiz-question-8';
 

// props expected by each question component - standardizes the interface
interface QuestionComponent {
  questionId: string;
  questionText: string;
  onAnswer: (questionId: string, choiceId: number) => void;
}

// structure for each question in the quiz pool
interface QuestionData {
  id: number;
  component: React.ComponentType<QuestionComponent>;  // react component class/function
  questionId: string;  // unique string identifier for tracking answers
  questionText: string;  // displayed question prompt
  correctAnswerId: number;  // numeric id of the correct choice
  explanation: {
    correct: string;    // explanation shown for correct answers
    incorrect: string;  // explanation shown for incorrect answers
  };
}

// props passed down from parent component
interface QuizFlowProps {
  onComplete: () => void;  // triggered when quiz finishes
  onRestart: () => void;   // triggered when restart button is clicked
}

// map of question ids to user's selected choice ids
type QuizAnswers = Record<string, number>;

export default function QuizFlow({ onComplete, onRestart }: QuizFlowProps) {
  // current position in selectedQuestions array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // stores user selections keyed by questionId
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  
  // subset of allQuestions that will be shown in this quiz session
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionData[]>([]);
  
  // whether to show final results screen
  const [showResults, setShowResults] = useState(false);
  
  // whether user has selected an answer for current question
  const [hasAnswered, setHasAnswered] = useState(false);
  
  // which choice user selected for current question
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  
  // max questions to display per quiz attempt
  const TOTAL_QUESTIONS = 5;
  
  // full question bank 8 sofar
  const allQuestions: QuestionData[] = [
    { 
      id: 1, 
      component: Question1, 
      questionId: 'q1', 
      questionText: "A call from the bank asks you to confirm your account number. You...",
      correctAnswerId: 2,  
      explanation: {
        correct: "Excellent! Banks should never call asking for your account details. Hanging up immediately protects your information.",
        incorrect: "Be careful! Real banks never ask for account numbers over the phone. Always hang up and call the bank directly using the number on your card."
      }
    },
    { 
      id: 2, 
      component: Question2, 
      questionId: 'q2', 
      questionText: "You receive an email saying you have won a prize. You...",
      correctAnswerId: 2,  
      explanation: {
        correct: "Smart choice! Prize emails are often phishing attempts. Always verify through official channels.",
        incorrect: "This is likely a scam. Prize notifications by email are usually fraudulent. Delete the email and never provide personal information."
      }
    },

    { 
      id: 3, 
      component: Question3, 
      questionId: 'q3', 
      questionText: "A friend sends a link asking for urgent help. You...",
      correctAnswerId: 1,  
      explanation: {
        correct: "Smart move! Always verify before clicking on a link, even if it seems urgent. Scammers often exploit urgency to trick people.",
        incorrect: "Not a good idea. Urgency can be a red flag in phishing attempts. Always verify before clicking."
      }
    },

    { 
      id: 4, 
      component: Question4, 
      questionId: 'q4', 
      questionText: "You find a USB drive labeled 'Confidential' in your classroom. You...",
      correctAnswerId: 2,  
      explanation: {
        correct: "Good call! Handing it to your teacher is the safest way to handle potentially dangerous USB drives.",
        incorrect: "Risky move. Unknown USB drives can contain malware. Always report them to an adult who may know better."

      }
    },

    { 
      id: 5, 
      component: Question5, 
      questionId: 'q5', 
      questionText: "You get a text asking for your password to reset your Instagram account. You...",
      correctAnswerId: 1,  
      explanation: {
        correct: "Smart decision. Legitimate companies will never ask for your password via text. Ignore and report the message.",
        incorrect: "Bad move. Sharing your password can lead to unauthorized access. Never share your password with anyone."

      }
    },

    { 
      id: 6, 
      component: Question6, 
      questionId: 'q6', 
      questionText: "You are about to download free software from a sketchy website. You...",
      correctAnswerId: 1,  
      explanation:   {
            correct: "Well done! Downloading software from unverified sites can expose your device to malware. Always verify the source.",
            incorrect: "Not a safe choice. Sketchy websites often host malicious software. Always verify before downloading."
        },
      },

      { 
      id: 7, 
      component: Question7, 
      questionId: 'q7', 
      questionText: "Your social media account shows a login from another country. You...",
      correctAnswerId: 1,  
      explanation:     {
            correct: "Good job! Unrecognized logins could mean your account is compromised. Changing the password helps secure it.",
            incorrect: "Ignoring it is risky. Suspicious logins could indicate a breach. Take action immediately."
          },

      },

      { 
      id: 8, 
      component: Question8, 
      questionId: 'q8', 
      questionText: "A classmate texts and asks for access to a your homework file. You....",
      correctAnswerId: 2,  
      explanation:   {
    correct: "Nice thinking! Confirming their identity prevents unauthorized access to sensitive files.",
    incorrect: "Not safe. Sharing sensitive files without verification can lead to unauthorized access."
        },
      },

   ];
  
  // run setup function on component mount
  useEffect(() => {
    initializeQuiz();
  }, []);
  
  // resets all state and creates new question set
  const initializeQuiz = () => {
    // fisher-yates shuffle algorithm to randomize questions
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j]!;
        shuffled[j] = temp!;
      }
      return shuffled;
    };
    
    // randomize and take first n questions
    const shuffled = shuffleArray(allQuestions);
    const selected = shuffled.slice(0, Math.min(allQuestions.length, TOTAL_QUESTIONS));
    setSelectedQuestions(selected);
    
    // clear previous session data
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setShowResults(false);
    setHasAnswered(false);
    setCurrentAnswer(null);
  };
  
  // percentage for progress bar based on completed questions
  const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
  
  // counts correct answers by comparing user choices with correct answers
  const calculateScore = (): number => {
    if (selectedQuestions.length === 0) return 0;
    
    let correctAnswers = 0;
    selectedQuestions.forEach(question => {
      const userAnswer = quizAnswers[question.questionId];
      
      if (userAnswer === question.correctAnswerId) {
        correctAnswers++;
      }
    });
    
    return correctAnswers;
  };
  
  // processes answer selection and sets answer state
  const handleAnswer = (questionId: string, choiceId: number) => {
    // update answers object with new selection
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: choiceId
    }));
    
    // track current answer for explanation display
    setCurrentAnswer(choiceId);
    setHasAnswered(true);
  };
  
  // handle next button click - advances to next question or shows results
  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasAnswered(false);
      setCurrentAnswer(null);
    } else {
      // quiz completed - show results
      setShowResults(true);
      onComplete(); // Notify parent component
    }
  };
  
  // determines what content to display based on current state
  const renderCurrentQuestion = () => {
    // loading state while questions are being initialized
    if (selectedQuestions.length === 0) {
      return (
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ffc067] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#ffc067] mt-4">Loading questions...</p>
        </div>
      );
    }
    
    // final results screen with score feedback
    if (showResults) {
      const score = calculateScore();
      const percentage = (score / selectedQuestions.length) * 100;
      
      return (
        <div className="text-center">
          {/* conditional result card based on performance threshold */}
          {percentage > 50 ? <QuizResultCardGood /> : <QuizResultCardBetter />}
          
          {/* restart quiz  */}
          <button
            onClick={() => {
              initializeQuiz();
              onRestart();
            }}
            className="mt-8 px-6 py-3 bg-[#ffc067] text-[#5b4636] font-bold rounded-lg hover:bg-[#e8b15e] transition-colors duration-200"
          >
            Take Quiz Again
          </button>
        </div>
      );
    }
    
    // safety check  shouldn't reach this state
    if (currentQuestionIndex >= selectedQuestions.length) {
      return (
        <div className="text-center">
          <h2 className="text-2xl text-[#ffc067] mb-4">Quiz Complete!</h2>
          <p className="text-[#ffc067]">Your answers have been recorded.</p>
        </div>
      );
    }
    
    // get current question data
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (!currentQuestion) {
      return <div className="text-[#ffc067]">Error loading question.</div>;
    }
    
    // dynamically render the appropriate question component
    const QuestionComponent = currentQuestion.component;
    
    // check if current answer matches correct answer
    const isCorrect = currentAnswer === currentQuestion.correctAnswerId;
    
    return (
      <div className="max-w-2xl w-full">
        <QuestionComponent
          questionId={currentQuestion.questionId}
          questionText={currentQuestion.questionText}
          onAnswer={handleAnswer}
        />
        
        {/* conditional feedback display after answer selection */}
        {hasAnswered && currentAnswer !== null && (
          <div className="mt-8 p-4 rounded-lg bg-[#f3e9d2] border-2 border-[#5b4636] mx-auto max-w-md">
            <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="text-[#5b4636] text-sm">
              {isCorrect ? currentQuestion.explanation.correct : currentQuestion.explanation.incorrect}
            </p>
            
            {/* Next button appears after answering */}
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-[#ffc067] text-[#5b4636] font-bold rounded-lg hover:bg-[#e8b15e] transition-colors duration-200 w-full"
            >
              {currentQuestionIndex < selectedQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // fallback for progress bar calculation
  const totalQuestionsToShow = selectedQuestions.length || TOTAL_QUESTIONS;
  
  return (
    <div className="w-full">
      {/* main content area with min height for layout stability */}
      <div className="flex items-center justify-center text-[#ffc067] min-h-96">
        {renderCurrentQuestion()}
      </div>

      {/* progress indicator - hidden during loading and results */}
      {selectedQuestions.length > 0 && !showResults && (
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-[#5b4636] text-sm mb-2">
            <span>Question {currentQuestionIndex + 1} of {totalQuestionsToShow}</span>
          </div>
          {/* animated progress bar with transitions */}
          <div className="w-full bg-[#5b4636] rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-[#ffc067] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}