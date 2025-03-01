import { Router } from 'express';
import Destination from '../models/destination';
import User from '../models/user';
import { GameResponse, AnswerRequest, AnswerResponse } from '../types';

const router = Router();

router.get('/destination/random', async (req, res) => {
  const destinations = await Destination.aggregate([{ $sample: { size: 4 } }]);
  const correct = destinations[0];
  const response: GameResponse = {
    destinationId: correct._id,
    clues: correct.clues.slice(0, 2),
    options: destinations
      .map(d => `${d.city}, ${d.country}`)
      .sort(() => Math.random() - 0.5),
  };
  res.json(response);
});

router.post('/destination/answer', async (req, res) => {
  const { destinationId, selectedAnswer, userId }: AnswerRequest = req.body;
  const destination = await Destination.findById(destinationId);
  if (!destination) return res.status(404).json({ error: 'Destination not found' });

  const isCorrect = `${destination.city}, ${destination.country}` === selectedAnswer;
  if (userId) {
    await User.findByIdAndUpdate(userId, {
      $inc: isCorrect ? { 'score.correct': 1 } : { 'score.incorrect': 1 },
    });
  }

  const response: AnswerResponse = {
    isCorrect,
    funFact: destination.fun_fact[Math.floor(Math.random() * 2)],
  };
  res.json(response);
});

router.post('/user/register', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username, score: { correct: 0, incorrect: 0 } });
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
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.score);
});

export default router;