import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function HirerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    honeypot: '',
  });
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (form.honeypot) return; // bot detected
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmit(true);
  };

  useEffect(() => {
    if (!submit) return;
    const register = async () => {
      try {
        const res = await fetch('/api/hirer/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
            confirmPassword: form.confirmPassword
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        setSuccess(true);
        setSuccessMsg(data.message || 'Registration successful!');
        setTimeout(() => navigate('/login-hirer'), 2000);
      } catch (err) {
        setError(err.message || 'Registration failed');
      } finally {
        setSubmit(false);
      }
    };
    register();
    // eslint-disable-next-line
  }, [submit]);

  if (success) return <div className="p-8 text-center text-green-700 font-bold">{successMsg}<br />Redirecting to login...</div>;

  return (
    <form className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 relative" onSubmit={handleSubmit} autoComplete="off">
      <button type="button" onClick={() => navigate('/')} className="absolute left-4 top-4 text-purple-700 hover:underline font-semibold flex items-center gap-1">
        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center mt-2">Register as a Hirer</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
      <div className="mb-4">
        <label className="block mb-1 font-semibold">First Name</label>
        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Last Name</label>
        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email Address</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required pattern="[0-9]{10,15}" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition">Register</button>
    </form>
  );
} 