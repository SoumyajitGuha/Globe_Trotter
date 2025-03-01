"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destination_1 = __importDefault(require("../models/destination"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/destination/random', async (req, res) => {
    const destinations = await destination_1.default.aggregate([{ $sample: { size: 4 } }]);
    const correct = destinations[0];
    const response = {
        destinationId: correct._id,
        clues: correct.clues.slice(0, 2),
        options: destinations
            .map(d => `${d.city}, ${d.country}`)
            .sort(() => Math.random() - 0.5),
    };
    res.json(response);
});
router.post('/destination/answer', async (req, res) => {
    const { destinationId, selectedAnswer, userId } = req.body;
    const destination = await destination_1.default.findById(destinationId);
    if (!destination)
        return res.status(404).json({ error: 'Destination not found' });
    const isCorrect = `${destination.city}, ${destination.country}` === selectedAnswer;
    if (userId) {
        await user_1.default.findByIdAndUpdate(userId, {
            $inc: isCorrect ? { 'score.correct': 1 } : { 'score.incorrect': 1 },
        });
    }
    const response = {
        isCorrect,
        funFact: destination.fun_fact[Math.floor(Math.random() * 2)],
    };
    res.json(response);
});
router.post('/user/register', async (req, res) => {
    const { username } = req.body;
    const user = new user_1.default({ username, score: { correct: 0, incorrect: 0 } });
    await user.save();
    res.json({ userId: user._id });
});
/* router.post('/user/register', async (req, res) => {
  const { username } = req.body;
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({ userId: existingUser._id }); // Return existing user ID
    }
    // Create new user if username is unique
    const user = new User({ username, score: { correct: 0, incorrect: 0 } });
    await user.save();
    res.status(201).json({ userId: user._id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}); */
router.get('/user/:userId/score', async (req, res) => {
    const user = await user_1.default.findById(req.params.userId);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user.score);
});
exports.default = router;
