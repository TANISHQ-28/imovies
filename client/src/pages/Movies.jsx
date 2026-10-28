import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    api('/movies').then(setMovies);
    api('/shows').then(setShows);
  }, []);

  return (
    <>
      <h2>Now Showing</h2>
      <div className="grid">
        {movies.map((m) => (
          <div className="card" key={m._id}>
            <h3>{m.title}</h3>
            <p className="muted">{m.genre} • {m.duration} min</p>
            <p>{m.description}</p>
            <strong>Shows</strong>
            {shows.filter((s) => s.movie?._id === m._id).map((s) => (
              <Link className="show" key={s._id} to={`/show/${s._id}`}>
                {s.theatre} — {new Date(s.time).toLocaleString()} (₹{s.price})
              </Link>
            ))}
          </div>
        ))}
        {movies.length === 0 && <p>No movies yet.</p>}
      </div>
    </>
  );
}
