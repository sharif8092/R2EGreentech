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
    const res = await axios.get(API + "get-leads.php");
    setLeads(res.data);
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Are you sure?")) {
      await axios.get(API + "delete-lead.php?id=" + id);
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Lead Management</h1>

      {filteredLeads.map(lead => (
        <div key={lead.id}>
          <h3>{lead.name}</h3>
          <p>{lead.email}</p>
          <button onClick={() => handleDelete(lead.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Leads;