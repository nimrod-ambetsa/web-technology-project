import React from 'react'
import Header from './components/header'
import "./App.css"
import { Routes, Route, useNavigate } from 'react-router';
import HireeRegister from './components/HireeRegister';
import HirerRegister from './components/HirerRegister';
import HireeLogin from './components/HireeLogin';
import HirerLogin from './components/HirerLogin';
import HireeDashboard from './components/HireeDashboard';
import HirerDashboard from './components/HirerDashboard';


function App() {
  const navigate = useNavigate();


  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <div>
              <div className="flex justify-end p-4">
                <div className="space-x-4">
                  <button className="text-blue-700 font-semibold hover:underline" onClick={() => navigate('/login-hiree')}>Hiree Login</button>
                  <button className="text-purple-700 font-semibold hover:underline" onClick={() => navigate('/login-hirer')}>Hirer Login</button>
                </div>
              </div>
              <div
                className="relative"
                style={{
                  backgroundImage: 'url(/home-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '24rem',
                }}
              >
                <div className="grid gap-0 justify-evenly items-center h-96 ">
                  <div className="text-3xl font-bold text-slate-800 drop-shadow-lg">
                    Welcome to Empower Illiter
                  </div>
                  <div className="flex gap-6 mt-4">
                    <button className="px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold shadow-lg hover:bg-blue-100 transition-all border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => navigate('/register-hiree')}>
                      List your service
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-800 transition-all border border-blue-900 focus:outline-none focus:ring-2 focus:ring-purple-400" onClick={() => navigate('/register-hirer')}>
                      Hire a service provider
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center gap-8 py-10 bg-white">
                <div className="w-11/12 md:w-3/4 max-w-2xl bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C7.305 20.5 3.5 16.695 3.5 12S7.305 3.5 12 3.5 20.5 7.305 20.5 12 16.695 20.5 12 20.5z" /></svg>
                    <h2 className="font-bold text-2xl text-blue-800">About us</h2>
                  </div>
                  <div className="text-slate-700 text-base leading-relaxed space-y-3 text-center">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                  </div>
                </div>
                <div className="w-11/12 md:w-3/4 max-w-2xl bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m0 0h4m-4 0H8" /></svg>
                    <h2 className="font-bold text-2xl text-purple-800">Our mission</h2>
                  </div>
                  <div className="text-slate-700 text-base leading-relaxed text-center">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate iusto corporis consectetur sed quam laborum ab eos, expedita ad similique consequatur obcaecati, distinctio culpa, cupiditate perferendis dolorum autem sunt!</p>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/register-hiree" element={<HireeRegister />} />
          <Route path="/register-hirer" element={<HirerRegister />} />
          <Route path="/login-hiree" element={<HireeLogin />} />
          <Route path="/login-hirer" element={<HirerLogin />} />
          <Route path="/dashboard-hiree" element={<HireeDashboard />} />
          <Route path="/dashboard-hirer" element={<HirerDashboard />} />
        </Routes>
      </div>

    </>
  )
}

export default App
