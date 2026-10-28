import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Admin() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: '', genre: '', duration: '', description: '' });
  const [show, setShow] = useState({ movie: '', theatre: '', time: '', price: 200 });
  const [msg, setMsg] = useState('');

  const load = () => api('/movies').then(setMovies);
  useEffect(() => { load(); }, []);

  const addMovie = async (e) => {
    e.preventDefault();
    try { await api('/movies', 'POST', movie); setMsg('Movie added'); load(); }
    catch (err) { setMsg(err.message); }
  };
  const addShow = async (e) => {
    e.preventDefault();
    try { await api('/shows', 'POST', show); setMsg('Show added'); }
    catch (err) { setMsg(err.message); }
  };
  const remove = async (id) => { await api('/movies/' + id, 'DELETE'); load(); };

  return (
    <>
      <h2>Admin Panel</h2>
      {msg && <p>{msg}</p>}
      <form className="card" onSubmit={addMovie}>
        <h3>Add movie</h3>
        <input placeholder="Title" onChange={(e) => setMovie({ ...movie, title: e.target.value })} />
        <input placeholder="Genre" onChange={(e) => setMovie({ ...movie, genre: e.target.value })} />
        <input placeholder="Duration (min)" type="number" onChange={(e) => setMovie({ ...movie, duration: e.target.value })} />
        <input placeholder="Description" onChange={(e) => setMovie({ ...movie, description: e.target.value })} />
        <button>Add movie</button>
      </form>
      <form className="card" onSubmit={addShow}>
        <h3>Add show</h3>
        <select onChange={(e) => setShow({ ...show, movie: e.target.value })}>
          <option value="">Select movie</option>
          {movies.map((m) => <option key={m._id} value={m._id}>{m.title}</option>)}
        </select>
        <input placeholder="Theatre" onChange={(e) => setShow({ ...show, theatre: e.target.value })} />
        <input type="datetime-local" onChange={(e) => setShow({ ...show, time: e.target.value })} />
        <input placeholder="Price" type="number" value={show.price} onChange={(e) => setShow({ ...show, price: e.target.value })} />
        <button>Add show</button>
      </form>
      <div className="card">
        <h3>Movies</h3>
        {movies.map((m) => (
          <p key={m._id}>{m.title} <button className="small" onClick={() => remove(m._id)}>Delete</button></p>
        ))}
      </div>
    </>
  );
}
