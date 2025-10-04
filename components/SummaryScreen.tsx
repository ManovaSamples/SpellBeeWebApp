
import React from 'react';
import { WordResult } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface SummaryScreenProps {
  results: WordResult[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ results, onPlayAgain, onGoHome }) => {
  const correctWords = results.filter(r => r.isCorrect);
  const incorrectWords = results.filter(r => !r.isCorrect);
  const score = correctWords.length;
  const total = results.length;
  const isPerfect = total > 0 && incorrectWords.length === 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 animate-bounce-in">
      <h1 className="text-4xl md:text-5xl font-fredoka text-indigo-600 text-center mb-2">Game Over!</h1>
      <p className="text-center text-2xl font-bold text-yellow-600 mb-6">
        Your final score is: {score} / {total}
      </p>

      {total > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Correct Words */}
          {correctWords.length > 0 && (
            <div className={`bg-green-100/50 p-4 rounded-xl ${isPerfect ? 'md:col-span-2' : ''}`}>
              <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center justify-center">
                <CheckIcon className="w-7 h-7 mr-2" />
                {isPerfect ? 'Perfect Score!' : 'Correct Words'}
              </h2>
              {isPerfect && (
                <p className="text-center text-green-800 mb-4">Amazing job! You spelled everything right.</p>
              )}
              <ul className="space-y-1 text-lg text-gray-800 max-h-48 overflow-y-auto pr-2">
                {correctWords.map((r, i) => (
                  <li key={i} className="font-semibold">
                    {r.word}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Incorrect Words */}
          {incorrectWords.length > 0 && (
            <div className="bg-red-100/50 p-4 rounded-xl">
              <h2 className="text-2xl font-bold text-red-700 mb-3 flex items-center justify-center">
                <XIcon className="w-7 h-7 mr-2" /> Words to Practice
              </h2>
              <ul className="space-y-2 text-lg text-red-800 max-h-48 overflow-y-auto pr-2">
                {incorrectWords.map((r, i) => (
                  <li key={i}>
                    <span className="font-semibold text-gray-800">{r.word}</span>
                    <div className="text-sm pl-2">
                      <span className="text-gray-600">You spelled: </span>
                      <span className="italic text-red-600">{r.userSpelling}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={onPlayAgain}
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Play Again
        </button>
        <button
          onClick={onGoHome}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
