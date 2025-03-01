import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import axios from 'axios';

interface ChallengePopupProps {
  userId: string;
  onClose: () => void;
}

const ChallengePopup: React.FC<ChallengePopupProps> = ({ userId, onClose }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateImage = async () => {
      if (canvasRef.current) {
        const canvas = await html2canvas(canvasRef.current, {
          backgroundColor: null,
          scale: 2, // Higher resolution
        });
        const image = canvas.toDataURL('image/png');
        const link = `https://globetrotter.app/challenge?inviterId=${userId}`;
        const whatsappLink = `https://wa.me/?text=Check%20out%20my%20Globetrotter%20challenge!%20Join%20me%20here:%20${encodeURIComponent(link)}`;
        window.open(whatsappLink, '_blank');
      }
    };
    generateImage();
  }, [userId]);

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