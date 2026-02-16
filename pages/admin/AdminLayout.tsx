
import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Globe, Settings } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('r2e_auth');
    if (!auth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('r2e_auth');
    localStorage.removeItem('r2e_current_user');
    navigate('/admin');
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', path: '/admin/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'CRM Leads', path: '/admin/leads' },
    { icon: <FileText className="w-5 h-5" />, label: 'Documents', path: '/admin/documents' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="text-xl font-black tracking-tighter">R2E<span className="text-emerald-500">Admin</span></div>
          <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mt-1">Control Panel</div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                location.pathname === item.path 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-slate-800">
           <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-2">
             <Globe className="w-4 h-4" />
             <span>View Live Site</span>
           </Link>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
           >
             <LogOut className="w-4 h-4" />
             <span>Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
