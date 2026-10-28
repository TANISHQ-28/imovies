import { Router } from 'express';
import Show from '../models/Show.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// optional filter: /api/shows?movie=<movieId>
router.get('/', async (req, res) => {
  const filter = req.query.movie ? { movie: req.query.movie } : {};
  res.json(await Show.find(filter).populate('movie', 'title').sort({ time: 1 }));
});

router.get('/:id', async (req, res) => {
  const show = await Show.findById(req.params.id).populate('movie', 'title');
  if (!show) return res.status(404).json({ message: 'Show not found' });
  res.json(show);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const { movie, theatre, time } = req.body;
  if (!movie || !theatre || !time) return res.status(400).json({ message: 'Movie, theatre and time are required' });
  res.status(201).json(await Show.create(req.body));
});

export default router;
