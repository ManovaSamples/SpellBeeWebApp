import React, { useState, useCallback } from 'react';
import { GameState, WordResult } from './types';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import SummaryScreen from './components/SummaryScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Home);
  const [results, setResults] = useState<WordResult[]>([]);
  const [gameWords, setGameWords] = useState<string[] | null>(null);

  const handleStartGame = useCallback((words?: string[]) => {
    setResults([]);
    setGameWords(words || null);
    setGameState(GameState.Playing);
  }, []);

  const handleFinishGame = useCallback((finalResults: WordResult[]) => {
    setResults(finalResults);
    setGameState(GameState.Summary);
  }, []);

  const handleGoHome = useCallback(() => {
    setGameState(GameState.Home);
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case GameState.Playing:
        return <GameScreen onFinish={handleFinishGame} onGoHomeRequest={handleGoHome} words={gameWords} />;
      case GameState.Summary:
        return <SummaryScreen results={results} onPlayAgain={() => handleStartGame()} onGoHome={handleGoHome} />;
      case GameState.Home:
      default:
        return <HomeScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">
      <div className="w-full max-w-2xl mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
