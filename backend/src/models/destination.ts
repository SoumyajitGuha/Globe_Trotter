import { Schema, model } from 'mongoose';
import { Destination } from '../types';

const DestinationSchema = new Schema<Destination>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  clues: [{ type: String, required: true }],
  fun_fact: [{ type: String, required: true }],
  trivia: [{ type: String, required: true }],
});

export default model<Destination>('Destination', DestinationSchema);