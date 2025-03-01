import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

// Enable CORS for your Vercel frontend
app.use(cors({
  origin: ['globe-trotter-ruddy.vercel.app'], // Replace with your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/globetrotter')
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
