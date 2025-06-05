import React, { useState } from 'react';

export default function HirerRegister() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    honeypot: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (form.honeypot) return; // bot detected
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSuccess(true);
  };

  if (success) return <div className="p-8 text-center text-green-700 font-bold">Registration successful! We will contact you soon.</div>;

  return (
    <form className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 mt-10" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Register as a Hirer</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />
      <div className="mb-4">
        <label className="block mb-1 font-semibold">First Name</label>
        <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Last Name</label>
        <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email Address</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="email" />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required pattern="[0-9]{10,15}" />
      </div>
      <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition">Register</button>
    </form>
  );
} 