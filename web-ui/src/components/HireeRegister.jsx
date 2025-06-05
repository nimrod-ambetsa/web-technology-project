import React, { useState } from 'react';

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
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    skill: '',
    experience: '',
    county: '',
    honeypot: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (form.honeypot) return; // bot detected
    if (!form.firstName || !form.lastName || !form.phone || !form.skill || !form.experience || !form.county) {
      setError('Please fill in all fields.');
      return;
    }
    setSuccess(true);
  };

  if (success) return <div className="p-8 text-center text-green-700 font-bold">Registration successful! We will contact you soon.</div>;

  return (
    <form className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 mt-10" onSubmit={handleSubmit} autoComplete="off">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">List Your Service</h2>
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
        <label className="block mb-1 font-semibold">Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required pattern="[0-9]{10,15}" />
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
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition">Register</button>
    </form>
  );
} 