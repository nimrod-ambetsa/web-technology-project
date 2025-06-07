import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const skills = [
  'Plumber', 'Groundsman', 'Electrician', 'Rider', 'Carpenter', 'Painter', 'Mason', 'Cook', 'Cleaner', 'Other'
];
const counties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
];

export default function HirerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [hirees, setHirees] = useState([]);
  const [filters, setFilters] = useState({ name: '', skill: '', experience: '', county: '' });
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const fetchHirees = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/hiree/list');
        const data = await res.json();
        setHirees(data);
        setFiltered(data);
      } catch {
        setHirees([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHirees();
  }, []);

  useEffect(() => {
    let result = [...hirees];
    if (filters.name) result = result.filter(h => (h.firstName + ' ' + h.lastName).toLowerCase().includes(filters.name.toLowerCase()));
    if (filters.skill) result = result.filter(h => h.skill === filters.skill);
    if (filters.experience) result = result.filter(h => String(h.experience) === String(filters.experience));
    if (filters.county) result = result.filter(h => h.county === filters.county);
    setFiltered(result);
  }, [filters, hirees]);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Welcome, {user?.firstName || 'User'}!</h2>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold">Logout</button>
      </div>
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input type="text" className="border rounded px-2 py-1" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} placeholder="Search by name" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Skill</label>
          <select className="border rounded px-2 py-1" value={filters.skill} onChange={e => setFilters(f => ({ ...f, skill: e.target.value }))}>
            <option value="">All</option>
            {skills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Experience (years)</label>
          <input type="number" className="border rounded px-2 py-1" value={filters.experience} onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))} min="0" placeholder="Any" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <select className="border rounded px-2 py-1" value={filters.county} onChange={e => setFilters(f => ({ ...f, county: e.target.value }))}>
            <option value="">All</option>
            {counties.map(county => <option key={county} value={county}>{county}</option>)}
          </select>
        </div>
        <div className="flex flex-col items-center justify-end">
          <button
            type="button"
            title="Reset all filters"
            aria-label="Reset all filters"
            onClick={() => setFilters({ name: '', skill: '', experience: '', county: '' })}
            className="ml-2 p-2 rounded-full border border-gray-300 bg-white shadow-sm hover:bg-blue-50 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition flex items-center justify-center group relative"
          >
            <svg className="w-6 h-6 text-blue-500 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M5 9A7 7 0 0112 5a7 7 0 017 7c0 1.657-.672 3.157-1.764 4.236M19 15a7 7 0 01-7 4 7 7 0 01-7-7c0-1.657.672-3.157 1.764-4.236" />
            </svg>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 shadow-lg">Reset all filters</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-purple-100">
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Skill</th>
              <th className="py-2 px-3 border">Experience</th>
              <th className="py-2 px-3 border">Location</th>
              <th className="py-2 px-3 border">Phone</th>
              <th className="py-2 px-3 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-6">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-6">No hirees found.</td></tr>
            ) : filtered.map((h, i) => (
              <tr key={i} className="even:bg-purple-50">
                <td className="py-2 px-3 border">{h.firstName} {h.lastName}</td>
                <td className="py-2 px-3 border">{h.skill}</td>
                <td className="py-2 px-3 border">{h.experience}</td>
                <td className="py-2 px-3 border">{h.county}</td>
                <td className="py-2 px-3 border">{h.phoneNumber || h.phone}</td>
                <td className="py-2 px-3 border">
                  <button onClick={() => window.alert(`Contact: ${h.phoneNumber || h.phone}`)} className="bg-slate-900 text-white px-3 py-1 rounded hover:cursor-pointer hover:bg-slate-800">Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 