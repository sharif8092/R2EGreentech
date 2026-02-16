
import React, { useState, useEffect } from 'react';
import { Shield, Key, UserPlus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team'>('profile');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  
  // Password Change State
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  // Add Admin State
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', role: 'Admin' });
  const [adminMessage, setAdminMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Load data
    const storedUser = JSON.parse(localStorage.getItem('r2e_current_user') || '{}');
    const storedAdmins = JSON.parse(localStorage.getItem('r2e_admins') || '[]');
    setCurrentUser(storedUser);
    setAdmins(storedAdmins);
  }, []);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ type: '', text: '' });

    if (passForm.new !== passForm.confirm) {
      setPassMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (passForm.current !== currentUser.password) {
      setPassMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    // Update password
    const updatedAdmins = admins.map(admin => {
      if (admin.id === currentUser.id) {
        return { ...admin, password: passForm.new };
      }
      return admin;
    });

    localStorage.setItem('r2e_admins', JSON.stringify(updatedAdmins));
    
    // Update current session
    const updatedUser = { ...currentUser, password: passForm.new };
    localStorage.setItem('r2e_current_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    setPassMessage({ type: 'success', text: 'Password updated successfully.' });
    setPassForm({ current: '', new: '', confirm: '' });
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminMessage({ type: '', text: '' });

    // Check if username exists
    if (admins.some(a => a.username === newAdmin.username)) {
      setAdminMessage({ type: 'error', text: 'Username already exists.' });
      return;
    }

    if (newAdmin.password.length < 6) {
      setAdminMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    const newAdminObj = {
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

  const handleDeleteAdmin = (id: number) => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium text-sm">Manage security and access control.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-1 text-sm font-black uppercase tracking-widest transition-colors ${
            activeTab === 'profile' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          My Security
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          className={`pb-3 px-1 text-sm font-black uppercase tracking-widest transition-colors ${
            activeTab === 'team' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Access Control
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase">Change Password</h3>
                  <p className="text-xs text-slate-500 font-medium">Update your login credentials securely.</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={passForm.current}
                    onChange={(e) => setPassForm({...passForm, current: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passForm.new}
                    onChange={(e) => setPassForm({...passForm, new: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Confirm New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passForm.confirm}
                    onChange={(e) => setPassForm({...passForm, confirm: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {passMessage.text && (
                  <div className={`flex items-center text-xs font-bold p-3 rounded-lg ${passMessage.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {passMessage.type === 'error' ? <AlertCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    {passMessage.text}
                  </div>
                )}

                <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/10">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              {/* Add Admin Form */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase">Grant Access</h3>
                    <p className="text-xs text-slate-500 font-medium">Create new administrator accounts.</p>
                  </div>
                </div>

                <form onSubmit={handleAddAdmin} className="grid md:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Username</label>
                    <input 
                      type="text" 
                      required
                      value={newAdmin.username}
                      onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="e.g. johndoe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Temporary Password</label>
                    <input 
                      type="text" 
                      required
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Min 6 chars"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">Role</label>
                    <select 
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10">
                    Add User
                  </button>
                </form>

                {adminMessage.text && (
                  <div className={`mt-4 flex items-center text-xs font-bold p-3 rounded-lg ${adminMessage.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {adminMessage.type === 'error' ? <AlertCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    {adminMessage.text}
                  </div>
                )}
              </div>

              {/* List Admins */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Active Administrators</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <th className="p-4">User</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Date Added</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-sm text-slate-700">
                            {admin.username} 
                            {currentUser?.id === admin.id && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">(You)</span>}
                          </td>
                          <td className="p-4 text-xs font-medium text-slate-500">{admin.role}</td>
                          <td className="p-4 text-xs text-slate-400">{new Date(admin.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            {currentUser?.id !== admin.id && (
                              <button onClick={() => handleDeleteAdmin(admin.id)} className="text-slate-300 hover:text-red-500 transition-colors">
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
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
             <div className="relative z-10">
               <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
                 <Shield className="w-5 h-5" />
               </div>
               <h4 className="font-bold text-lg mb-2">Security Best Practices</h4>
               <ul className="space-y-3 text-xs text-slate-400 font-medium">
                 <li className="flex items-start">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                   Use complex passwords with mixed characters.
                 </li>
                 <li className="flex items-start">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                   Limit the number of accounts with 'Super Admin' privileges.
                 </li>
                 <li className="flex items-start">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 shrink-0"></span>
                   Revoke access immediately for departed employees.
                 </li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
