import React, { useState, useEffect } from 'react';
import { Shield, Key, UserPlus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
  password: string;
  role: string;
  date: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team'>('profile');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', role: 'Admin' });
  const [adminMessage, setAdminMessage] = useState({ type: '', text: '' });

  // SAFE JSON PARSER
  const safeParse = (data: string | null, fallback: any) => {
    try {
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const storedAdmins = safeParse(localStorage.getItem('r2e_admins'), []);
    const storedUser = safeParse(localStorage.getItem('r2e_current_user'), null);

    // 🔥 Auto create default admin if none exists
    if (!storedAdmins || storedAdmins.length === 0) {
      const defaultAdmin: AdminUser = {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "Super Admin",
        date: new Date().toISOString()
      };
      localStorage.setItem('r2e_admins', JSON.stringify([defaultAdmin]));
      localStorage.setItem('r2e_current_user', JSON.stringify(defaultAdmin));
      setAdmins([defaultAdmin]);
      setCurrentUser(defaultAdmin);
    } else {
      setAdmins(storedAdmins);
      setCurrentUser(storedUser);
    }
  }, []);

  // ================= PASSWORD UPDATE =================
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ type: '', text: '' });

    if (!currentUser) return;

    if (passForm.new !== passForm.confirm) {
      setPassMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passForm.current !== currentUser.password) {
      setPassMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    const updatedAdmins = admins.map(admin =>
      admin.id === currentUser.id
        ? { ...admin, password: passForm.new }
        : admin
    );

    localStorage.setItem('r2e_admins', JSON.stringify(updatedAdmins));

    const updatedUser = { ...currentUser, password: passForm.new };
    localStorage.setItem('r2e_current_user', JSON.stringify(updatedUser));

    setAdmins(updatedAdmins);
    setCurrentUser(updatedUser);

    setPassMessage({ type: 'success', text: 'Password updated successfully.' });
    setPassForm({ current: '', new: '', confirm: '' });
  };

  // ================= ADD ADMIN =================
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMessage({ type: '', text: '' });

    if (admins.some(a => a.username === newAdmin.username)) {
      setAdminMessage({ type: 'error', text: 'Username already exists.' });
      return;
    }

    if (newAdmin.password.length < 6) {
      setAdminMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    const newAdminObj: AdminUser = {
      id: Date.now(),
      username: newAdmin.username,
      password: newAdmin.password,
      role: newAdmin.role,
      date: new Date().toISOString()
    };

    const updatedAdmins = [...admins, newAdminObj];
    localStorage.setItem('r2e_admins', JSON.stringify(updatedAdmins));
    setAdmins(updatedAdmins);

    setAdminMessage({ type: 'success', text: 'New admin added successfully.' });
    setNewAdmin({ username: '', password: '', role: 'Admin' });
  };

  // ================= DELETE ADMIN =================
  const handleDeleteAdmin = (id: number) => {
    if (!currentUser) return;

    if (id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }

    if (window.confirm('Are you sure you want to remove this admin access?')) {
      const updatedAdmins = admins.filter(a => a.id !== id);
      localStorage.setItem('r2e_admins', JSON.stringify(updatedAdmins));
      setAdmins(updatedAdmins);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
        System Settings
      </h1>

      {/* Rest of your UI remains same — no change needed below */}

      {/* Your original JSX continues here exactly same */}
      
    </div>
  );
};

export default Settings;