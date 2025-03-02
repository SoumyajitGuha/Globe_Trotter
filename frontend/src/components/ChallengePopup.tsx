import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import axios from 'axios';

interface ChallengePopupProps {
  userId: string;
  onClose: () => void;
}

const ChallengePopup: React.FC<ChallengePopupProps> = ({ userId, onClose }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the user's score
    const fetchScore = async () => {
      try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://globetrotter-backend.onrender.com';
        const { data } = await axios.get<{ score: number }>(`${BACKEND_URL}/api/user/${userId}/score`);
        setScore(data.score);
      } catch (err) {
        console.error('Error fetching score:', err);
        setScore(0); // Fallback score
      }
    };

    fetchScore();
  }, [userId]);

  useEffect(() => {
    const generateImage = async () => {
      if (canvasRef.current && score !== null) {
        const canvas = await html2canvas(canvasRef.current, {
          backgroundColor: null,
          scale: 2, // Higher resolution
        });
        const image = canvas.toDataURL('image/png');
        const link = `https://globe-trotter-27da.vercel.app/challenge?inviterId=${userId}`;
        const whatsappLink = `https://wa.me/?text=I%20scored%20${score}%20on%20Globetrotter!%20Beat%20me%20here:%20${encodeURIComponent(link)}`;
        window.open(whatsappLink, '_blank');
      }
    };
    if (score !== null) generateImage(); // Wait for score to load
  }, [userId, score]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <div ref={canvasRef} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-blue-600 mb-4 text-center"
          >
            Challenge a Friend!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
              <span className="font-semibold text-blue-800">Your ID:</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-900">{userId}</span>
            </p>
            {score !== null && (
              <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                <span className="font-semibold text-blue-800">Your Score:</span>
                <span className="bg-green-100 px-3 py-1 rounded-full text-green-900">{score}</span>
              </p>
            )}
            <p className="text-gray-600 text-center text-lg">
              Sharing your challenge via WhatsApp...
            </p>
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-3xl"
              >
                🌍
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-xl font-semibold text-lg shadow-md hover:from-red-600 hover:to-pink-700 transition-all duration-300"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ChallengePopup;