
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default admin if no users exist in the system
    const storedAdmins = localStorage.getItem('r2e_admins');
    if (!storedAdmins) {
      const defaultAdmin = [
        { id: 1, username: 'admin', password: 'admin123', role: 'Super Admin', date: new Date().toISOString() }
      ];
      localStorage.setItem('r2e_admins', JSON.stringify(defaultAdmin));
    }
    
    // Check if already logged in
    if (localStorage.getItem('r2e_auth')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const admins = JSON.parse(localStorage.getItem('r2e_admins') || '[]');
    const user = admins.find((a: any) => a.username === username && a.password === password);

    if (user) {
      localStorage.setItem('r2e_auth', 'true');
      localStorage.setItem('r2e_current_user', JSON.stringify(user)); // Store session info
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl text-emerald-500 mb-6 shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Admin Portal</h1>
          <p className="text-slate-400 text-sm font-medium">R2E Greentech Corporate Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter ID"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Enter Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-bold text-center bg-red-900/20 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center group transition-all">
            Access System
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="text-center mt-4">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">Default: admin / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
