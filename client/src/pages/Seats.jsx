import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, getUser } from '../api.js';

export default function Seats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');

  const load = () => api('/shows/' + id).then(setShow);
  useEffect(() => { load(); }, [id]);

  if (!show) return <p>Loading...</p>;

  const toggleSeat = (n) => {
    if (show.bookedSeats.includes(n)) return;
    setSelected(selected.includes(n) ? selected.filter((s) => s !== n) : [...selected, n]);
  };

  const confirm = async () => {
    if (!getUser()) return navigate('/login');
    try {
      await api('/bookings', 'POST', { showId: id, seats: selected });
      navigate('/my-bookings');
    } catch (err) {
      setError(err.message);
      setSelected([]);
      load(); // refresh so the newly taken seats show up
    }
  };

  const seatNumbers = Array.from({ length: show.totalSeats }, (_, i) => i + 1);

  return (
    <div className="card">
      <h2>{show.movie.title}</h2>
      <p className="muted">{show.theatre} — {new Date(show.time).toLocaleString()}</p>
      <div className="screen">SCREEN</div>
      <div className="seats">
        {seatNumbers.map((n) => (
          <div
            key={n}
            onClick={() => toggleSeat(n)}
            className={'seat ' + (show.bookedSeats.includes(n) ? 'booked' : selected.includes(n) ? 'selected' : '')}
          >{n}</div>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <p>Seats: {selected.join(', ') || 'none'} | Total: ₹{selected.length * show.price}</p>
      <button disabled={selected.length === 0} onClick={confirm}>Confirm Booking</button>
    </div>
  );
}
