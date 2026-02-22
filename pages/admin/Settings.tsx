import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Key, UserPlus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminUser {
  id: number;
  username: string;
  role: string;
  created_at?: string;
}

const AUTH_API = "https://r2egreentech.in/backend/auth/";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team'>('profile');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', role: 'Admin' });
  const [adminMessage, setAdminMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const user = localStorage.getItem('r2e_current_user');
    if (user) setCurrentUser(JSON.parse(user));
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(AUTH_API + "get-admins.php");
      if(Array.isArray(res.data)) {
        setAdmins(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch admins", error);
    }
  };

  // ================= PASSWORD UPDATE =================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ type: '', text: '' });

    if (!currentUser) return;
    if (passForm.new !== passForm.confirm) {
      setPassMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    try {
      const res = await axios.post(AUTH_API + "update-password.php", {
        id: currentUser.id,
        current_password: passForm.current,
        new_password: passForm.new
      });

      if(res.data.status === 'success') {
        setPassMessage({ type: 'success', text: 'Password updated successfully.' });
        setPassForm({ current: '', new: '', confirm: '' });
      } else {
        setPassMessage({ type: 'error', text: res.data.message || 'Incorrect current password.' });
      }
    } catch (error) {
      setPassMessage({ type: 'error', text: 'Server error updating password.' });
    }
  };

  // ================= ADD ADMIN =================
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMessage({ type: '', text: '' });

    if (newAdmin.password.length < 6) {
      setAdminMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    try {
      const res = await axios.post(AUTH_API + "add-admin.php", newAdmin);
      if(res.data.status === 'success') {
        setAdminMessage({ type: 'success', text: 'New admin added successfully.' });
        setNewAdmin({ username: '', password: '', role: 'Admin' });
        fetchAdmins(); // Refresh list
      } else {
        setAdminMessage({ type: 'error', text: res.data.message || 'Failed to add admin.' });
      }
    } catch (error) {
      setAdminMessage({ type: 'error', text: 'Server error. User might already exist.' });
    }
  };

  // ================= DELETE ADMIN =================
  const handleDeleteAdmin = async (id: number) => {
    if (!currentUser) return;

    if (id === currentUser.id) {
      alert("You cannot delete your own account while logged in.");
      return;
    }

    if (window.confirm('Are you sure you want to remove this admin access?')) {
      try {
        await axios.get(AUTH_API + "delete-admin.php?id=" + id);
        fetchAdmins(); // Refresh list
      } catch (error) {
        alert("Error deleting admin");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Manage security and access control.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button onClick={() => setActiveTab('profile')} className={`pb-3 px-1 text-sm font-black uppercase tracking-widest ${activeTab === 'profile' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400'}`}>
          My Security
        </button>
        <button onClick={() => setActiveTab('team')} className={`pb-3 px-1 text-sm font-black uppercase tracking-widest ${activeTab === 'team' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400'}`}>
          Access Control
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Key className="w-6 h-6" /></div>
                <div><h3 className="text-lg font-black text-slate-900 uppercase">Change Password</h3></div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                <input type="password" placeholder="Current Password" required value={passForm.current} onChange={(e) => setPassForm({...passForm, current: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                <input type="password" placeholder="New Password" required value={passForm.new} onChange={(e) => setPassForm({...passForm, new: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                <input type="password" placeholder="Confirm New Password" required value={passForm.confirm} onChange={(e) => setPassForm({...passForm, confirm: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />

                {passMessage.text && (
                  <div className={`p-3 rounded-lg text-xs font-bold ${passMessage.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {passMessage.text}
                  </div>
                )}
                <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase hover:bg-emerald-600">Update Password</button>
              </form>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><UserPlus className="w-6 h-6" /></div>
                  <div><h3 className="text-lg font-black text-slate-900 uppercase">Grant Access</h3></div>
                </div>

                <form onSubmit={handleAddAdmin} className="grid md:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Username</label>
                    <input type="text" required value={newAdmin.username} onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Password</label>
                    <input type="text" required value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-500">Role</label>
                    <select value={newAdmin.role} onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <option>Admin</option><option>Editor</option><option>Viewer</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase">Add User</button>
                </form>

                {adminMessage.text && (
                  <div className={`mt-4 p-3 rounded-lg text-xs font-bold ${adminMessage.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>{adminMessage.text}</div>
                )}
              </div>

              {/* Admins Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="p-4">User</th><th className="p-4">Role</th><th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-sm text-slate-700">
                            {admin.username} {currentUser?.id === admin.id && <span className="ml-2 text-[10px] text-emerald-600">(You)</span>}
                        </td>
                        <td className="p-4 text-xs font-medium text-slate-500">{admin.role}</td>
                        <td className="p-4 text-right">
                          {currentUser?.id !== admin.id && (
                            <button onClick={() => handleDeleteAdmin(admin.id)} className="text-slate-300 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;