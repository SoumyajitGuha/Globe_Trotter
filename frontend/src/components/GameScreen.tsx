import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Confetti from 'react-confetti';
import { GameState, Feedback, Score } from '../types';
import ChallengePopup from './ChallengePopup';

interface GameScreenProps {
  userId?: string;
}

const TOTAL_QUESTIONS = 10;

const GameScreen: React.FC<GameScreenProps> = ({ userId }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });
  const [showChallenge, setShowChallenge] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchDestination = async () => {
    const { data } = await axios.get<GameState>('http://localhost:3000/api/destination/random');
    setGameState(data);
    setFeedback(null);
    setSelectedAnswer(null);
    setShowConfetti(false);
  };

  const submitAnswer = async (answer: string) => {
    if (feedback) return;

    const { data } = await axios.post<Feedback>('http://localhost:3000/api/destination/answer', {
      destinationId: gameState?.destinationId,
      selectedAnswer: answer,
      userId,
    });
    setFeedback(data);
    setSelectedAnswer(answer);
    setScore(prev => {
      const newScore = {
        correct: prev.correct + (data.isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (data.isCorrect ? 0 : 1),
      };
      if (newScore.correct + newScore.incorrect === TOTAL_QUESTIONS) {
        setGameOver(true);
      }
      return newScore;
    });

    if (data.isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const startNewGame = () => {
    setScore({ correct: 0, incorrect: 0 });
    setGameOver(false);
    fetchDestination();
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const progress = ((score.correct + score.incorrect) / TOTAL_QUESTIONS) * 100;

  const getButtonClass = (option: string) => {
    if (!feedback || selectedAnswer !== option) {
      return "bg-cyan-700 text-white p-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 shadow-md";
    }
    return feedback.isCorrect
      ? "bg-green-700 text-white p-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
      : "bg-red-600 text-white p-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md";
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 relative overflow-hidden"
      style={{ backgroundImage: "url('/gameScreen.jpg')" }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          tweenDuration={3000}
        />
      )}

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-white mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] z-10"
      >
        Globetrotter
      </motion.h1>

      {gameState && !gameOver && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl z-10"
        >
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl mb-6">
            <p className="mb-2">
              <span className="text-xl text-blue-800 font-medium">Hint 1: </span>
              <span className="text-xl text-gray-800 font-medium">{gameState.clues[0]}</span>
            </p>
            <p className="mb-4">
              <span className="text-xl text-blue-800 font-medium">Hint 2: </span>
              <span className="text-xl text-gray-800 font-medium">{gameState.clues[1]}</span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {gameState.options.map(option => (
                <motion.button
                  key={option}
                  whileHover={{ scale: feedback ? 1 : 1.05 }}
                  whileTap={{ scale: feedback ? 1 : 0.95 }}
                  onClick={() => submitAnswer(option)}
                  disabled={!!feedback}
                  className={getButtonClass(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <div className="mt-5">
              <div className="mt-3 w-full max-w-xs mx-auto">
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-cyan-900 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {score.correct + score.incorrect} of {TOTAL_QUESTIONS}
                </p>
              </div>
            </div>
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl text-center relative z-10"
            >
              {feedback.isCorrect ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    className="text-3xl font-bold text-green-500 mb-2"
                  >
                    🎉 Correct!
                  </motion.div>
                  <p className="text-gray-700 text-lg">{feedback.funFact}</p>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0, 0],    // Shake then settle upright
                      x: [0, -20, 20, -20, 20, 0, 0],         // Shake then settle
                      y: [0, 0, 0, 0, 30, 70, 110],          // Gradual descent, landing further down
                      transition: {
                        duration: 1.5,                        // Total duration
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1.2, 1.5], // Keyframe timing
                        ease: [
                          "easeInOut", "easeInOut", "easeInOut", // Shake easing
                          "easeInOut", "easeOut", "easeOut",     // Transition to descent
                          "easeOut"                              // Smooth landing
                        ]
                      }
                    }}
                    className="text-6xl absolute top-[-50px] left-0 right-0 mx-auto z-20"
                  >
                    😢
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-red-500 mb-2 mt-12"
                  >
                    Wrong!
                  </motion.div>
                  <p className="text-gray-700 text-lg">{feedback.funFact}</p>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchDestination}
                className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
              >
                Next Destination
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black/70 to-gray-900/70 p-4 z-20"
        >
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4 border border-gray-100/20">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mb-6"
            >
              <motion.h2
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 1, ease: "easeInOut" }}
                className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-lg"
              >
                Game Over!
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-3xl text-gray-900 mb-8 font-bold tracking-wide"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Final Score:{" "}
              <span className="inline-block bg-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full shadow-sm">
                {score.correct}
              </span>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={startNewGame}
                className="bg-blue-500 text-white p-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(234, 179, 8, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChallenge(true)}
                className="bg-yellow-500 text-white p-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Challenge a Friend
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {showChallenge && userId && (
        <ChallengePopup userId={userId} onClose={() => setShowChallenge(false)} />
      )}
    </div>
  );
};

export default GameScreen;