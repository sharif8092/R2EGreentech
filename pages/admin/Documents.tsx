
import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';

const Documents: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([
    { id: 1, name: 'R2E_Corporate_Profile_v2025.pdf', size: '4.2 MB', date: '2025-01-15', active: true },
    { id: 2, name: 'HVAC_Case_Study_Pharma.pdf', size: '2.1 MB', date: '2024-11-20', active: false },
    { id: 3, name: 'E_Waste_Compliance_Checklist.pdf', size: '1.5 MB', date: '2024-10-05', active: false },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      
      // Simulate network request
      setTimeout(() => {
        setFiles(prev => [{
          id: Date.now(),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          date: new Date().toISOString().split('T')[0],
          active: false
        }, ...prev]);
        setUploading(false);
      }, 2000);
    }
  };

  const deleteFile = (id: number) => {
    if(window.confirm('Delete this file?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Document Center</h1>
        <p className="text-slate-500 font-medium text-sm">Manage downloadable assets for the public website.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 font-medium leading-relaxed">
          <strong>Demo Mode:</strong> Files uploaded here are simulated for the interface demonstration. In a production environment, this would connect to an AWS S3 bucket or similar storage provider.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="md:col-span-1">
          <label className={`
            border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all
            ${uploading ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'}
          `}>
            <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} disabled={uploading} />
            
            {uploading ? (
               <div className="text-center">
                 <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Uploading...</span>
               </div>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Click to Upload</h4>
                <p className="text-xs text-slate-400 font-medium">PDF files only. Max 10MB.</p>
              </div>
            )}
          </label>
        </div>

        {/* File List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Library</h3>
          {files.map((file) => (
            <div key={file.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{file.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">
                    {file.size} • Uploaded {file.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {file.active ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    Live
                  </span>
                ) : (
                  <button className="px-3 py-1 bg-slate-100 text-slate-500 hover:bg-emerald-600 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors">
                    Activate
                  </button>
                )}
                <button onClick={() => deleteFile(file.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
