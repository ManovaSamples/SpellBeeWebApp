
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WORDS } from '../constants';
import { WordResult } from '../types';
import ConfirmationModal from './ConfirmationModal';
import SpeakerIcon from './icons/SpeakerIcon';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import HomeIcon from './icons/HomeIcon';
import { playClickSound } from '../utils/sounds';

interface GameScreenProps {
  onFinish: (results: WordResult[]) => void;
  onGoHomeRequest: () => void;
  words?: string[] | null;
}

const GameScreen: React.FC<GameScreenProps> = ({ onFinish, onGoHomeRequest, words }) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [results, setResults] = useState<WordResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let gameWords: string[];
    if (words && words.length > 0) {
      // Use the provided list (sorted for letters, pre-shuffled for A-Z)
      gameWords = words;
    } else {
      // Default case (e.g., "Play Again"): create a new random game
      gameWords = [...WORDS].sort(() => 0.5 - Math.random());
    }
    setWordList(gameWords);
    setCurrentWordIndex(0);
    setResults([]);
  }, [words]);

  const currentWord = wordList.length > 0 ? wordList[currentWordIndex] : '';
  const score = results.filter(r => r.isCorrect).length;

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    if(wordList.length > 0) {
        speak(wordList[currentWordIndex]);
        inputRef.current?.focus();
    }
  }, [currentWordIndex, wordList, speak]);

  const handleSpeakerClick = () => {
    playClickSound();
    speak(currentWord);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !userInput.trim()) return;

    setIsSubmitting(true);
    const isCorrect = userInput.trim().toLowerCase() === currentWord.toLowerCase();
    
    const newResult: WordResult = {
      word: currentWord,
      userSpelling: userInput.trim(),
      isCorrect,
    };
    
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback(null);
      setUserInput('');
      if (currentWordIndex + 1 < wordList.length) {
        setCurrentWordIndex(prevIndex => prevIndex + 1);
      } else {
        onFinish(updatedResults);
      }
    }, isCorrect ? 1500 : 2500);
  };

  const handleConfirmQuit = () => {
    onFinish(results);
  };

  if(wordList.length === 0) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setShowConfirmation(true)} className="text-indigo-500 hover:text-indigo-700 transition-colors">
            <HomeIcon />
          </button>
          <div className="text-2xl font-bold text-yellow-500 bg-white px-4 py-2 rounded-full shadow-inner">
            Score: {score}
          </div>
          <div className="text-lg font-semibold text-gray-600">
            Word {currentWordIndex + 1} / {wordList.length}
          </div>
        </div>

        <div className="text-center my-8 md:my-12">
          <button
            onClick={handleSpeakerClick}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-6 shadow-lg transform hover:scale-110 transition-transform duration-300"
          >
            <SpeakerIcon />
          </button>
          <p className="text-gray-600 mt-4">Click the button to hear the word</p>
        </div>

        {feedback && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-3xl z-10">
            {feedback === 'correct' && (
              <div className="text-center bg-white p-8 rounded-2xl shadow-lg animate-bounce-in">
                <CheckIcon className="w-24 h-24 text-green-500 mx-auto" />
                <p className="text-4xl font-fredoka text-green-500 mt-4">Correct!</p>
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="text-center bg-white p-8 rounded-2xl shadow-lg animate-shake">
                <XIcon className="w-24 h-24 text-red-500 mx-auto" />
                <p className="text-3xl font-fredoka text-red-500 mt-4">Not quite!</p>
                <p className="text-lg text-gray-700 mt-2">The correct spelling is:</p>
                <p className="text-2xl font-bold text-indigo-600 tracking-widest">{currentWord}</p>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSubmitting}
            className="w-full max-w-md text-center text-3xl font-bold tracking-widest p-4 border-4 border-indigo-300 rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all"
            placeholder="Type the word"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button
            type="submit"
            disabled={isSubmitting || !userInput.trim()}
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-2xl py-3 px-12 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:bg-gray-300 disabled:scale-100"
          >
            Check
          </button>
        </form>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirmQuit}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

export default GameScreen;
