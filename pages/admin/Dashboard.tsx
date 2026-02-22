import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, FileText, TrendingUp } from 'lucide-react';

interface Stats {
  leads: number;
  docs: number;
}

interface AdminUser {
  username: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ leads: 0, docs: 0 });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  const safeParse = (data: string | null, fallback: any) => {
    try {
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    // Current logged-in user ko local session se nikalna theek hai
    const user = safeParse(localStorage.getItem('r2e_current_user'), null);
    setCurrentUser(user);

    // Fetch real stats from Database via APIs
    const fetchStats = async () => {
      try {
        const leadsRes = await axios.get("https://r2egreentech.in/backend/leads/get-leads.php");
        // Assuming documents API exists as per standard structure
        const docsRes = await axios.get("https://r2egreentech.in/backend/documents/get-documents.php").catch(() => ({ data: [] }));
        
        setStats({
          leads: Array.isArray(leadsRes.data) ? leadsRes.data.length : 0,
          docs: Array.isArray(docsRes.data) ? docsRes.data.length : 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-500 font-medium">
          Welcome back, {currentUser?.username || 'Administrator'}.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEADS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">
            {stats.leads}
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            Total Leads
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">
            {stats.docs}
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            Active Documents
          </div>
        </div>

        {/* UPTIME */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-1">
            99.9%
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-400">
            System Uptime
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-black uppercase tracking-wide mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="#/admin/documents"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-sm transition-colors"
            >
              Upload New Profile
            </a>
            <a
              href="#/admin/leads"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors"
            >
              View Recent Inquiries
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;