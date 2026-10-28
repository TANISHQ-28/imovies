import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api(isLogin ? '/auth/login' : '/auth/register', 'POST', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Create account'}</h2>
      {!isLogin && <input name="name" placeholder="Name" onChange={handleChange} />}
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      {error && <p className="error">{error}</p>}
      <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
      <p className="link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Sign up" : 'Already have an account? Login'}
      </p>
    </form>
  );
}
