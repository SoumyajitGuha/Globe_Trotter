export interface Destination {
    _id?: string;
    city: string;
    country: string;
    clues: string[];
    fun_fact: string[];
    trivia: string[];
  }
  
  export interface User {
    _id?: string;
    username: string;
    score: {
      correct: number;
      incorrect: number;
    };
  }
  
  export interface GameResponse {
    destinationId: string;
    clues: string[];
    options: string[];
  }
  
  export interface AnswerRequest {
    destinationId: string;
    selectedAnswer: string;
    userId?: string;
  }
  
  export interface AnswerResponse {
    isCorrect: boolean;
    funFact: string;
  }