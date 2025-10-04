
export enum GameState {
  Home = 'HOME',
  Playing = 'PLAYING',
  Summary = 'SUMMARY',
}

export interface WordResult {
  word: string;
  userSpelling: string;
  isCorrect: boolean;
}
