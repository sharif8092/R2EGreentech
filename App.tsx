
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Industries = React.lazy(() => import('./pages/Industries'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Download = React.lazy(() => import('./pages/Download'));

// Admin Pages
const AdminLogin = React.lazy(() => import('./pages/admin/Login'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const Leads = React.lazy(() => import('./pages/admin/Leads'));
const Documents = React.lazy(() => import('./pages/admin/Documents'));
const Settings = React.lazy(() => import('./pages/admin/Settings'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-emerald-900 font-bold uppercase tracking-widest text-xs">R2E Greentech</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes - Wrapped in Layout */}
            <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/about" element={<><Navbar /><main className="flex-grow"><About /></main><Footer /></>} />
            <Route path="/services" element={<><Navbar /><main className="flex-grow"><Services /></main><Footer /></>} />
            <Route path="/industries" element={<><Navbar /><main className="flex-grow"><Industries /></main><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />
            <Route path="/download" element={<><Navbar /><main className="flex-grow"><Download /></main><Footer /></>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="documents" element={<Documents />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
