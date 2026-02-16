
import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Trash2, Database, Power, Tag, Check, RefreshCw, AlertCircle } from 'lucide-react';

interface DocFile {
  id: number;
  name: string;
  size: string;
  date: string;
  location: string;
  active: boolean;
  mongoId: string;
  content?: string; // Store Base64 data string
}

const Documents: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected'>('connecting');
  const [targetLocation, setTargetLocation] = useState('Corporate Profile');
  const [files, setFiles] = useState<DocFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Simulate MongoDB Connection and Data Fetching
  useEffect(() => {
    const connectToDB = async () => {
      setTimeout(() => {
        setDbStatus('connected');
        // Fetch from 'Database' (localStorage)
        const storedDocs = localStorage.getItem('r2e_documents');
        if (storedDocs) {
          setFiles(JSON.parse(storedDocs));
        } else {
          // Seed Data if empty
          const seed: DocFile[] = [
            { id: 1, name: 'R2E_Corporate_Profile_v2025.pdf', size: '4.2 MB', date: '2025-01-15', location: 'Download Page', active: true, mongoId: '65f1a2b3c' },
            { id: 2, name: 'HVAC_Case_Study_Pharma.pdf', size: '2.1 MB', date: '2024-11-20', location: 'Services: HVAC', active: false, mongoId: '65f1a2b4d' },
            { id: 3, name: 'E_Waste_Compliance_Checklist.pdf', size: '1.5 MB', date: '2024-10-05', location: 'Downloads Page', active: false, mongoId: '65f1a2b5e' },
          ];
          setFiles(seed);
          localStorage.setItem('r2e_documents', JSON.stringify(seed));
        }
      }, 1500);
    };
    connectToDB();
  }, []);

  // Sync state to 'Database'
  const saveToDatabase = (updatedFiles: DocFile[]) => {
    try {
      localStorage.setItem('r2e_documents', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
      setError(null);
    } catch (e) {
      setError("Storage quota exceeded. Please upload a smaller file.");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Browser storage limit check (approx 2.5MB safety limit for localStorage)
      if (file.size > 2.5 * 1024 * 1024) {
        setError("File too large for browser database. Please upload PDF < 2.5MB.");
        return;
      }

      setUploading(true);
      setError(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Content = event.target?.result as string;
        
        // Simulate network delay
        setTimeout(() => {
          const newFile: DocFile = {
            id: Date.now(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            date: new Date().toISOString().split('T')[0],
            location: targetLocation,
            active: true, // Auto-activate on upload
            mongoId: Math.random().toString(36).substring(7),
            content: base64Content
          };
          
          saveToDatabase([newFile, ...files]);
          setUploading(false);
        }, 1500);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const toggleStatus = (id: number) => {
    const updatedFiles = files.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    );
    saveToDatabase(updatedFiles);
  };

  const deleteFile = (id: number) => {
    if(window.confirm('Are you sure you want to delete this file from the database?')) {
      const updatedFiles = files.filter(f => f.id !== id);
      saveToDatabase(updatedFiles);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Document Center</h1>
          <p className="text-slate-500 font-medium text-sm">Manage public-facing assets.</p>
        </div>
        
        {/* DB Connection Indicator */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
          dbStatus === 'connected' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
            : 'bg-amber-50 text-amber-600 border-amber-200'
        }`}>
          {dbStatus === 'connected' ? (
            <>
              <Database className="w-3.5 h-3.5" />
              <span>MongoDB: Connected</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Connecting to DB...</span>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center text-sm font-bold">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center">
               <Tag className="w-3.5 h-3.5 mr-2" />
               Target Location
             </h3>
             <select 
               value={targetLocation}
               onChange={(e) => setTargetLocation(e.target.value)}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-emerald-500 transition-colors mb-4"
             >
               <option value="Corporate Profile">Corporate Profile (Download Page)</option>
               <option value="HVAC Tech Specs">HVAC Technical Specs</option>
               <option value="Solar EPC">Solar EPC Brochure</option>
               <option value="Compliance">E-Waste Compliance Certs</option>
             </select>

             <label className={`
                border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all
                ${uploading ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'}
              `}>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} disabled={uploading} />
                
                {uploading ? (
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Syncing to Cloud...</span>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Upload PDF</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Max 2.5MB</p>
                  </div>
                )}
              </label>
          </div>
        </div>

        {/* File List */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Database Records</h3>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">{files.length} Entries</span>
          </div>
          
          {files.map((file) => (
            <div key={file.id} className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between group transition-all duration-300 ${file.active ? 'border-emerald-500/30 ring-1 ring-emerald-500/20' : 'border-slate-100 hover:border-slate-300'}`}>
              <div className="flex items-start space-x-4 mb-3 sm:mb-0">
                <div className={`p-3 rounded-lg transition-colors ${file.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[250px]">{file.name}</div>
                  <div className="flex items-center space-x-2 mt-1">
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        {file.location.includes('Download') ? 'Profile' : file.location}
                     </span>
                     <span className="text-[9px] text-slate-400 font-medium">
                       ID: {file.mongoId} • {file.size}
                     </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                <button 
                  onClick={() => toggleStatus(file.id)}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                    file.active 
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600' 
                    : 'bg-slate-100 text-slate-500 hover:bg-emerald-500 hover:text-white'
                  }`}
                >
                  <Power className="w-3 h-3 mr-1.5" />
                  {file.active ? 'Live' : 'Inactive'}
                </button>
                
                <button 
                  onClick={() => deleteFile(file.id)} 
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete from Database"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {files.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
               <p className="text-slate-400 text-sm font-medium">No documents found in database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
