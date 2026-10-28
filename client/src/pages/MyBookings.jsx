import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/bookings/mine').then(setBookings).catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <h2>My Bookings</h2>
      {error && <p className="error">{error}</p>}
      {bookings.map((b) => (
        <div className="card" key={b._id}>
          <h3>{b.show?.movie?.title}</h3>
          <p>{b.show?.theatre} — {b.show && new Date(b.show.time).toLocaleString()}</p>
          <p>Seats: {b.seats.join(', ')} | Paid: ₹{b.amount}</p>
        </div>
      ))}
      {!error && bookings.length === 0 && <p>No bookings yet.</p>}
    </>
  );
}
