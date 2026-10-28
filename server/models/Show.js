import mongoose from 'mongoose';

export default mongoose.model('Show', new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: String, required: true },
  time: { type: Date, required: true },
  price: { type: Number, default: 200 },
  totalSeats: { type: Number, default: 40 },
  bookedSeats: { type: [Number], default: [] }, // seat numbers already taken
}));
