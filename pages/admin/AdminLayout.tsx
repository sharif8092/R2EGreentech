import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Settings,
  ExternalLink,
  Image as ImageIcon,
  MonitorPlay
} from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
  role: string;
}

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Safe JSON parser
  const safeParse = (data: string | null) => {
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('r2e_auth');
    const storedUser = safeParse(localStorage.getItem('r2e_current_user'));

    if (!auth || !storedUser) {
      navigate('/admin', { replace: true });
    } else {
      setCurrentUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('r2e_auth');
    localStorage.removeItem('r2e_current_user');
    navigate('/admin', { replace: true });
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', path: '/admin/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'CRM Leads', path: '/admin/leads' },
    { icon: <FileText className="w-5 h-5" />, label: 'Documents', path: '/admin/documents' },
    { icon: <ImageIcon className="w-5 h-5" />, label: 'Team & Media', path: '/admin/promoters' },
    { icon: <MonitorPlay className="w-5 h-5" />, label: 'Site Images', path: '/admin/media' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
  ];

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col h-screen sticky top-0">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-800">
          <div className="text-xl font-black tracking-tighter">
            R2E<span className="text-emerald-500">Admin</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-1">
            Control Panel
          </div>
        </div>

        {/* EXIT BUTTON */}
        <div className="px-4 pt-6 pb-2">
          <Link
            to="/"
            className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition-all shadow-lg group border border-emerald-500"
          >
            <span className="text-xs font-black uppercase tracking-widest mr-2">
              Exit to Website
            </span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                location.pathname === item.path
                  ? 'bg-white/10 text-white shadow-lg border border-white/5'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* USER PANEL */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">

          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">
              {currentUser.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {currentUser.username}
              </div>
              <div className="text-[9px] text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {currentUser.role}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;