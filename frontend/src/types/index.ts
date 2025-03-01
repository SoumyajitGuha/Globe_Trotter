export interface GameState {
    destinationId: string;
    clues: string[];
    options: string[];
  }
  
  export interface Feedback {
    isCorrect: boolean;
    funFact: string;
  }
  
  export interface Score {
    correct: number;
    incorrect: number;
  }