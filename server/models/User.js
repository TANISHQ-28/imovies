import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // stored hashed
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.model('User', userSchema);
