import { Router } from 'express';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => res.json(await Movie.find().sort({ _id: -1 })));

router.post('/', protect, adminOnly, async (req, res) => {
  if (!req.body.title) return res.status(400).json({ message: 'Title is required' });
  res.status(201).json(await Movie.create(req.body));
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  await Show.deleteMany({ movie: req.params.id }); // remove its shows too
  res.json({ message: 'Deleted' });
});

export default router;
