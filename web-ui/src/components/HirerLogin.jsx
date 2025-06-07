import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function HirerLogin() {
  const [form, setForm] = useState({ identifier: '', password: '', honeypot: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.honeypot) return;
    setLoading(true);
    try {
      const res = await fetch('/api/hirer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.hirer));
      navigate('/dashboard-hirer');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 relative" onSubmit={handleSubmit} autoComplete="off">
      <button type="button" onClick={() => navigate('/')} className="absolute left-4 top-4 text-purple-700 hover:underline font-semibold flex items-center gap-1">
        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center mt-2">Hirer Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email or Phone Number</label>
        <input type='email' name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Password</label>
        <input name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="password" />
      </div>
      <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
} 