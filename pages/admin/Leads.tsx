import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  category: string;
  message: string;
  created_at: string;
}

const API = "https://r2egreentech.in/backend/leads/";

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(API + "get-leads.php");
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.get(API + "delete-lead.php?id=" + id);
        fetchLeads();
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lead Management</h1>

      {/* Added Search Input Field */}
      <input 
        type="text" 
        placeholder="Search by Name, Email or Company..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredLeads.map(lead => (
          <div key={lead.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#f9f9f9' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{lead.name} <span style={{ fontSize: '14px', color: 'gray' }}>({lead.company})</span></h3>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Category:</strong> {lead.category}</p>
            <p><strong>Message:</strong> {lead.message}</p>
            {lead.created_at && <p><small>Date: {lead.created_at}</small></p>}
            
            <button 
                onClick={() => handleDelete(lead.id)}
                style={{ background: 'red', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Delete Lead
            </button>
          </div>
        ))}
        {filteredLeads.length === 0 && <p>No leads found.</p>}
      </div>
    </div>
  );
};

export default Leads;