import React, { useMemo } from 'react';
import { WORDS } from '../constants';

interface HomeScreenProps {
  onStart: (words?: string[]) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const randomWordCount = Math.min(WORDS.length, 20);

  const lettersWithWords = useMemo(() => {
    const letters = new Set<string>();
    WORDS.forEach(word => letters.add(word[0].toUpperCase()));
    return letters;
  }, []);

  const handleLetterClick = (letter: string) => {
    const wordsForLetter = WORDS.filter(word => word.toUpperCase().startsWith(letter));
    if (wordsForLetter.length > 0) {
      onStart(wordsForLetter);
    }
  };

  const handleStartRandomGame = () => {
    const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
    const randomWords = shuffled.slice(0, randomWordCount);
    onStart(randomWords);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-bounce-in">
      <h1 className="text-4xl md:text-6xl font-fredoka text-indigo-600 mb-4">Spelling Bee Fun!</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md mx-auto">
        Listen to the word and type the correct spelling. Let's see how many you can get right!
      </p>

      {/* Alphabet Section */}
      <div className="mt-8 pt-8 border-t-2 border-indigo-100">
        <h2 className="text-3xl font-fredoka text-indigo-500 mb-4">Practice by Letter</h2>
        <p className="text-gray-600 mb-6">Click a letter to spell words that start with it!</p>
        <div className="flex flex-wrap justify-center gap-3">
          {alphabet.map(letter => {
            const hasWords = lettersWithWords.has(letter);
            const label = hasWords
              ? `Spell words starting with ${letter}`
              : `No words available for letter ${letter}`;

            return (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={!hasWords}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center shadow-md border-2 border-transparent ${
                  hasWords
                    ? 'bg-white hover:bg-indigo-100 text-indigo-500'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                }`}
                aria-label={label}
                title={label}
              >
                {letter}
              </button>
            );
          })}
          <button
            key="a-z"
            onClick={handleStartRandomGame}
            className="h-12 md:h-14 px-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center shadow-md border-2 border-transparent bg-yellow-400 hover:bg-yellow-500 text-gray-800"
            aria-label={`Spell ${randomWordCount} random words from A to Z`}
          >
            A-Z
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
