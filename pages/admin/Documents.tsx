import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, Trash2, Database, Power, Tag, RefreshCw, AlertCircle } from 'lucide-react';

interface DocFile {
  id: number;
  name: string;
  size: string;
  location: string;
  active: boolean | number;
  file_path?: string;
}

const API = "https://r2egreentech.in/backend/documents/";

const Documents: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected'>('connecting');
  const [targetLocation, setTargetLocation] = useState('Corporate Profile');
  const [files, setFiles] = useState<DocFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setDbStatus('connecting');
      const res = await axios.get(API + "get-documents.php");
      // Agar backend empty array deta hai to error na aaye
      if(Array.isArray(res.data)) {
        setFiles(res.data);
      }
      setDbStatus('connected');
    } catch (error) {
      console.error("Failed to load docs");
      setError("Failed to fetch documents from database.");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 2.5 * 1024 * 1024) {
        setError("File too large. Please upload PDF < 2.5MB.");
        return;
      }

      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      formData.append('location', targetLocation);
      formData.append('size', `${(file.size / (1024 * 1024)).toFixed(2)} MB`);

      try {
        const res = await axios.post(API + "upload.php", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (res.data.status === 'success') {
          fetchDocuments(); // Refresh list after upload
        } else {
          setError("Upload failed on server.");
        }
      } catch (err) {
        setError("Network error while uploading.");
      } finally {
        setUploading(false);
      }
    }
  };

  const deleteFile = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this file from the database?')) {
      try {
        await axios.get(API + "delete.php?id=" + id);
        fetchDocuments(); // Refresh list
      } catch (err) {
        setError("Failed to delete file.");
      }
    }
  };

  const toggleStatus = async (id: number) => {
    // Agar aapne update.php (status toggle ke liye) banaya hai, to usko yaha call karein. 
    // Abhi ke liye hum simple alert de rahe hain kyunki PHP API exact confirmation chahiye.
    alert("This requires update.php API to change active status in DB. Call axios.post('update.php', {id: id}) here.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Document Center</h1>
          <p className="text-slate-500 font-medium text-sm">Manage public-facing assets.</p>
        </div>
        
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors ${
          dbStatus === 'connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
        }`}>
          {dbStatus === 'connected' ? (
            <>
              <Database className="w-3.5 h-3.5" />
              <span>Database: Connected</span>
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
        {/* Upload Form */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center">
               <Tag className="w-3.5 h-3.5 mr-2" /> Target Location
             </h3>
             <select 
               value={targetLocation}
               onChange={(e) => setTargetLocation(e.target.value)}
               className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none mb-4"
             >
               <option value="Corporate Profile">Corporate Profile (Download Page)</option>
               <option value="HVAC Tech Specs">HVAC Technical Specs</option>
               <option value="Solar EPC">Solar EPC Brochure</option>
             </select>

             <label className={`border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all ${uploading ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'}`}>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} disabled={uploading} />
                {uploading ? (
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <span className="text-xs font-black uppercase text-emerald-600">Syncing to Cloud...</span>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex justify-center items-center mx-auto mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Upload PDF</h4>
                  </div>
                )}
              </label>
          </div>
        </div>

        {/* List Files */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Database Records</h3>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">{files.length} Entries</span>
          </div>
          
          {files.map((file) => (
            <div key={file.id} className="bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300">
              <div className="flex items-start space-x-4 mb-3 sm:mb-0">
                <div className={`p-3 rounded-lg bg-emerald-100 text-emerald-600`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[250px]">{file.name}</div>
                  <div className="flex items-center space-x-2 mt-1">
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        {file.location}
                     </span>
                     <span className="text-[9px] text-slate-400 font-medium">{file.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 w-full sm:w-auto">
                <button onClick={() => toggleStatus(file.id)} className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-500">
                  <Power className="w-3 h-3 inline mr-1" /> Status
                </button>
                <button onClick={() => deleteFile(file.id)} className="p-2 text-slate-300 hover:text-red-500">
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