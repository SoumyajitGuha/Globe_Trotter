import { Schema, model } from 'mongoose';
import { User } from '../types';

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  score: {
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
  },
});

export default model<User>('User', UserSchema);