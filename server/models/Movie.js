import mongoose from 'mongoose';

export default mongoose.model('Movie', new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  duration: Number, // minutes
  description: String,
  poster: String,   // image url
}));
