import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getUser } from './api.js';
import Movies from './pages/Movies.jsx';
import Auth from './pages/Auth.jsx';
import Seats from './pages/Seats.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const user = getUser();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <nav>
        <Link to="/" className="logo">🎬 IMovies</Link>
        <div>
          {user ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout ({user.name})</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/show/:id" element={<Seats />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}
