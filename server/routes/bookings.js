import { Router } from 'express';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, async (req, res) => {
  const { showId, seats } = req.body;
  if (!showId || !Array.isArray(seats) || seats.length === 0)
    return res.status(400).json({ message: 'Select at least one seat' });

  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: 'Show not found' });
  if (seats.some((s) => !Number.isInteger(s) || s < 1 || s > show.totalSeats))
    return res.status(400).json({ message: 'Invalid seat number' });

  // Double booking protection:
  // This update only succeeds if NONE of the requested seats are already booked.
  // MongoDB does the check and the update in one atomic step, so two people
  // clicking the same seat at the same moment can't both win.
  const updated = await Show.findOneAndUpdate(
    { _id: showId, bookedSeats: { $nin: seats } },
    { $push: { bookedSeats: { $each: seats } } },
    { new: true }
  );
  if (!updated) return res.status(409).json({ message: 'Some of those seats were just taken. Please pick again.' });

  const booking = await Booking.create({
    user: req.user.id, show: showId, seats, amount: seats.length * show.price,
  });
  res.status(201).json(booking);
});

router.get('/mine', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate({ path: 'show', populate: { path: 'movie', select: 'title' } })
    .sort({ createdAt: -1 });
  res.json(bookings);
});

export default router;
