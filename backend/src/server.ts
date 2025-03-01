import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/globetrotter';
console.log('Connecting to:', mongoUri); // Debug the URI

mongoose.connect(mongoUri)
  .then(() => {
    const port = process.env.PORT || 3000; // Dynamic port for Render
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));