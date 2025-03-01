import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameScreen from './components/GameScreen';
import axios from 'axios';

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const registerUser = async () => {
    if (userName) {
      const { data } = await axios.post<{ userId: string }>(`${API_URL}/api/user/register`, { username: userName });
      setUserId(data.userId);
      setIsModalOpen(false);
      setUserName('');
    }
  };

  return (
    <div>
      {!userId ? (
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-black bg-center"
          style={{ backgroundImage: "url('/gameScreen.jpg')" }}
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, animation: "pulse 2s infinite" }}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              borderColor: "#fff",
              boxShadow: "0 0 20px rgba(255, 120, 150, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3)",
              backgroundColor: "rgba(255, 255, 255, 0.25)" // Simplified for animation
            }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            className="w-[500px] h-[200px] border-2 rounded-[50px] bg-[rgba(255,255,255,0.2)] text-black text-5xl font-bold backdrop-blur-[10px] transition-all duration-300 ease-in-out shadow-[0_4px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            <span className="text-4xl">🌍</span>
            Dive into Adventure!
          </motion.button>

          {/* Enhanced Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
              <div className="bg-white w-[600px] max-w-[90vw] rounded-2xl shadow-2xl p-8 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
                <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  Welcome, Gamer!
                </h2>

                {/* Rules Section */}
                <div className="text-gray-600 text-center mb-4">
                  <p className="text-lg font-semibold mb-2">
                    Think you know the world? Test your travel knowledge by guessing famous destinations from cryptic clues!
                  </p>
                  <div className="text-left text-base space-y-2">
                    <p className="font-bold flex items-center gap-2">
                      <span className="text-xl">📜</span> How to Play:
                    </p>
                    <ul className="list-none space-y-1 pl-6">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">1️⃣</span>
                        <span><span className="font-semibold">Get Your Clue</span> – We’ll give you 1–2 hints about a famous place.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">2️⃣</span>
                        <span><span className="font-semibold">Make a Guess</span> – Choose the correct destination from the options.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">3️⃣</span>
                        <span><span className="font-semibold">See What Happens!</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">4️⃣</span>
                        <span><span className="font-semibold">Keep Score</span> – Track your correct and incorrect guesses.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">5️⃣</span>
                        <span><span className="font-semibold">Challenge a Friend</span> – Share your score and invite friends to play!</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">6️⃣</span>
                        <span><span className="font-semibold">Play Again</span> – Click "Next" to guess a new destination!</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-600 text-center mb-4 text-lg font-extrabold">Please enter your username to begin</p>

                <div className="relative mb-8">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    placeholder="Your gaming username"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    {userName && <span className="text-green-500">✓</span>}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setUserName('');
                    }}
                    className="flex-1 py-3 px-6 bg-gray-200 rounded-xl text-gray-700 font-semibold text-lg hover:bg-gray-300 transition-all duration-300 hover:shadow-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={registerUser}
                    disabled={!userName}
                    className="flex-1 py-3 px-6 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:shadow-md"
                  >
                    Start Adventure
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <GameScreen userId={userId} />
      )}
    </div>
  );
};

export default App;