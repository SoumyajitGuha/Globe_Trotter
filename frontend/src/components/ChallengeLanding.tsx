import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
// Import your game logic component (adjust as needed)
import GameScreen from './GameScreen';

const ChallengeLanding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const inviterId = searchParams.get('inviterId');
  const [inviterScore, setInviterScore] = useState<number | null>(null);

  useEffect(() => {
    if (inviterId) {
      const fetchInviterScore = async () => {
        try {
          const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://globetrotter-backend.onrender.com';
          const { data } = await axios.get<{ score: number }>(`${BACKEND_URL}/api/user/${inviterId}/score`);
          setInviterScore(data.score);
        } catch (err) {
          console.error('Error fetching inviter score:', err);
          setInviterScore(null);
        }
      };
      fetchInviterScore();
    }
  }, [inviterId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {inviterId ? (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            You’ve been challenged by {inviterId}!
          </h1>
          {inviterScore !== null && (
            <p className="text-lg text-gray-700 mb-6">
              Their Score: <span className="font-bold text-green-600">{inviterScore}</span>
            </p>
          )}
          <GameScreen /> {/* Render the game here */}
        </>
      ) : (
        <p className="text-lg text-red-600">Invalid challenge link.</p>
      )}
    </div>
  );
};

export default ChallengeLanding;