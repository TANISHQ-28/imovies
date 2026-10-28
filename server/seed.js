// Run once: npm run seed  (adds an admin account and sample data)
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Movie from './models/Movie.js';
import Show from './models/Show.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
await Promise.all([User.deleteMany(), Movie.deleteMany(), Show.deleteMany()]);

await User.create({ name: 'Admin', email: 'admin@imovies.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });

const movies = await Movie.insertMany([
  { title: 'Space Odyssey', genre: 'Sci-Fi', duration: 140, description: 'A crew travels beyond the solar system.' },
  { title: 'Laugh Riot', genre: 'Comedy', duration: 110, description: 'Three friends, one disastrous road trip.' },
  { title: 'Midnight Case', genre: 'Thriller', duration: 125, description: 'A detective races against the clock.' },
]);

const day = 24 * 60 * 60 * 1000;
for (const m of movies) {
  await Show.create({ movie: m._id, theatre: 'PVR Screen 1', time: new Date(Date.now() + day), price: 250 });
  await Show.create({ movie: m._id, theatre: 'INOX Screen 2', time: new Date(Date.now() + 2 * day), price: 200 });
}
console.log('Seeded. Admin login: admin@imovies.com / admin123');
process.exit();
