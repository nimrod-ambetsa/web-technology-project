import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const counties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
];

export default function HireeDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('hiree')));
  const [sidebar, setSidebar] = useState('profile');
  const [editForm, setEditForm] = useState({ phoneNumber: user?.phoneNumber || '', experience: user?.experience || '', county: user?.county || '' });
  const [editMsg, setEditMsg] = useState('');
  const [gigs, setGigs] = useState([]);
  const [gigTab, setGigTab] = useState('active');
  const [loadingGigs, setLoadingGigs] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('hiree');
    navigate('/');
  };

  // Edit profile submit
  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditMsg('');
    try {
      const res = await fetch('/api/hiree/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          phoneNumber: editForm.phoneNumber,
          experience: editForm.experience,
          county: editForm.county
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setEditMsg('Profile updated successfully!');
      setUser(u => ({ ...u, ...editForm }));
      localStorage.setItem('user', JSON.stringify({ ...user, ...editForm }));
    } catch (err) {
      setEditMsg(err.message || 'Update failed');
    }
  };

  // Fetch gigs
  useEffect(() => {
    if (sidebar !== 'gigs' && sidebar !== 'history') return;
    setLoadingGigs(true);
    fetch('/api/hiree/gigs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
      if (!res.ok) throw new Error('Failed to fetch gigs');
      return res.json();
      })
      .then(data => setGigs(Array.isArray(data) ? data : []))
      .catch(() => setGigs([]))
      .finally(() => setLoadingGigs(false));
  }, [sidebar]);

  // Filter gigs by status
  const filteredGigs = gigs.filter(g => g.status === gigTab);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg rounded-xl m-6 flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Welcome, {user?.firstName || 'User'}!</h2>
          <button onClick={handleLogout} className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold w-full">Logout</button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className={`w-full text-left px-4 py-2 rounded ${sidebar === 'profile' ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'}`} onClick={() => setSidebar('profile')}>Edit Profile</button>
          <button className={`w-full text-left px-4 py-2 rounded ${sidebar === 'gigs' ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'}`} onClick={() => setSidebar('gigs')}>Gigs</button>
          <button className={`w-full text-left px-4 py-2 rounded ${sidebar === 'history' ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'}`} onClick={() => setSidebar('history')}>Gig History</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Edit Profile */}
        {sidebar === 'profile' && (
          <form onSubmit={handleEditSubmit} className="max-w-md bg-white rounded-xl shadow p-8 mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Edit Profile</h3>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Phone Number</label>
              <input name="phoneNumber" value={editForm.phoneNumber} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Experience (years)</label>
              <input name="experience" value={editForm.experience} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required type="number" min="0" max="60" />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-semibold">Location (County)</label>
              <select name="county" value={editForm.county} onChange={handleEditChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select county</option>
                {counties.map(county => <option key={county} value={county}>{county}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition">Save Changes</button>
            {editMsg && <div className="mt-4 text-center text-green-700 font-semibold">{editMsg}</div>}
          </form>
        )}
        {/* Gigs and History */}
        {(sidebar === 'gigs' || sidebar === 'history') && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex gap-4 mb-4">
              <button className={`px-4 py-2 rounded ${gigTab === 'active' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`} onClick={() => setGigTab('active')}>Active</button>
              <button className={`px-4 py-2 rounded ${gigTab === 'completed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`} onClick={() => setGigTab('completed')}>Completed</button>
              <button className={`px-4 py-2 rounded ${gigTab === 'canceled' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`} onClick={() => setGigTab('canceled')}>Canceled</button>
            </div>
            {loadingGigs ? (
              <div className="text-center py-8">Loading gigs...</div>
            ) : filteredGigs.length === 0 ? (
              <div className="text-center py-8">No gigs found for this status.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-3 border">Hirer</th>
                      <th className="py-2 px-3 border">Status</th>
                      <th className="py-2 px-3 border">Hirer Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGigs.map((gig, i) => (
                      <tr key={i} className="even:bg-blue-50">
                        <td className="py-2 px-3 border">{gig.hirerName}</td>
                        <td className="py-2 px-3 border">{gig.status}</td>
                        <td className="py-2 px-3 border">{gig.hirerEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 