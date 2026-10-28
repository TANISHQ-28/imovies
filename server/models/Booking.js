import mongoose from 'mongoose';

export default mongoose.model('Booking', new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seats: { type: [Number], required: true },
  amount: Number,
}, { timestamps: true }));
