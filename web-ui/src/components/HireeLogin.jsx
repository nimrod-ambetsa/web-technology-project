import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function HireeLogin() {
  const [form, setForm] = useState({ phone: '', password: '', honeypot: '' });
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
      const res = await fetch('/api/login-hiree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, password: form.password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard-hiree');
    } catch (err) {
      setError('Login failed. Please check your phone and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 relative" onSubmit={handleSubmit} autoComplete="off">
      <button type="button" onClick={() => navigate('/')} className="absolute left-4 top-4 text-blue-600 hover:underline font-semibold flex items-center gap-1">
        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center mt-2">Hiree Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required pattern="[0-9]{10,15}" />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Password</label>
        <input name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="password" />
      </div>
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
} 