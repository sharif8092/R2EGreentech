
import React, { useEffect, useState } from 'react';
import { Search, Download, Trash2, Mail } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  category: string;
  message: string;
  date: string;
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = JSON.parse(localStorage.getItem('r2e_leads') || '[]');
    // Sort by date new to old
    setLeads(storedLeads.reverse());
  }, []);

  const handleDelete = (id: number) => {
    if(window.confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(l => l.id !== id);
      setLeads(updatedLeads);
      localStorage.setItem('r2e_leads', JSON.stringify(updatedLeads.reverse()));
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Lead Management</h1>
          <p className="text-slate-500 font-medium text-sm">Track and manage website inquiries.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center">
        <Search className="w-5 h-5 text-slate-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search by Name, Company or Email..." 
          className="w-full text-sm font-medium outline-none text-slate-700 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="p-6">Date</th>
                <th className="p-6">Contact Info</th>
                <th className="p-6">Requirement</th>
                <th className="p-6">Message</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-xs font-bold text-slate-500 whitespace-nowrap">
                      {new Date(lead.date).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                      <div className="text-xs font-medium text-slate-500">{lead.company}</div>
                      <a href={`mailto:${lead.email}`} className="text-xs text-emerald-600 font-bold flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" /> {lead.email}
                      </a>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                        {lead.category}
                      </span>
                    </td>
                    <td className="p-6 text-xs text-slate-600 font-medium max-w-xs truncate">
                      {lead.message}
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400 font-medium">
                    No leads found. Submissions from the Contact page will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
