import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const skills = [
  'Plumber',
  'Groundsman',
  'Electrician',
  'Rider',
  'Carpenter',
  'Painter',
  'Mason',
  'Cook',
  'Cleaner',
  'Other',
];

const counties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
];

export default function HireeRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    skill: '',
    experience: '',
    county: '',
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

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (form.honeypot) return; // bot detected
    if (!form.firstName || !form.lastName || !form.phoneNumber || !form.skill || !form.experience || !form.county || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmit(true);
  };

  useEffect(() => {
    if (!submit) return;
    const register = async () => {
      try {
        const res = await fetch('/api/hiree/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            phoneNumber: form.phoneNumber,
            password: form.password,
            confirmPassword: form.confirmPassword,
            skill: form.skill,
            experience: form.experience,
            county: form.county
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        setSuccess(true);
        setSuccessMsg(data.message || 'Registration successful!');
        setTimeout(() => navigate('/login-hiree'), 2000);
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
      <button type="button" onClick={() => navigate('/')} className="absolute left-4 top-4 text-blue-600 hover:underline font-semibold flex items-center gap-1">
        <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center mt-2">List Your Service</h2>
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
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input type="text" name='phoneNumber' value={form.phoneNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" required  />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Skill Offered</label>
        <select name="skill" value={form.skill} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
          <option value="">Select skill</option>
          {skills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Years of Experience</label>
        <input name="experience" value={form.experience} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="number" min="0" max="60" />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Location (County)</label>
        <select name="county" value={form.county} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
          <option value="">Select county</option>
          {counties.map(county => <option key={county} value={county}>{county}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Password</label>
        <input name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="password" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Confirm Password</label>
        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" required type="password" />
      </div>
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition">Register</button>
    </form>
  );
} 