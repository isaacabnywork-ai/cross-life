import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { RegistrationProvider } from './context/RegistrationContext';
import { Layout } from './components/layout/Layout';

// Public pages (Directly imported for fastest public first-paint)
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Conference } from './pages/Conference';
import { Speakers } from './pages/Speakers';
import { Partners } from './pages/Partners';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { StatementOfFaith } from './pages/StatementOfFaith';

// Lazy-loaded Admin CMS Pages (Code-split to isolate admin bundle from public users)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPages = lazy(() => import('./pages/admin/AdminPages'));
const AdminPageEditor = lazy(() => import('./pages/admin/AdminPageEditor'));
const AdminNavigation = lazy(() => import('./pages/admin/AdminNavigation'));
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia'));
const AdminFaqs = lazy(() => import('./pages/admin/AdminFaqs'));
const AdminSpeakersPartners = lazy(() => import('./pages/admin/AdminSpeakersPartners'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminActivity = lazy(() => import('./pages/admin/AdminActivity'));

const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
    <div className="w-10 h-10 border-4 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
    <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Loading CMS Portal...</span>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <CMSProvider>
        <RegistrationProvider>
          <Routes>
            {/* Admin Authentication */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            {/* Protected Admin CMS Dashboard */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLayout />
                </Suspense>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="builder" element={<AdminPageEditor />} />
              <Route path="navigation" element={<AdminNavigation />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="faqs" element={<AdminFaqs />} />
              <Route path="speakers-partners" element={<AdminSpeakersPartners />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="activity" element={<AdminActivity />} />
            </Route>

            {/* Public Website Pages with Shared Header/Footer Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/conference" element={<Conference />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/statement-of-faith" element={<StatementOfFaith />} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </RegistrationProvider>
      </CMSProvider>
    </BrowserRouter>
  );
}

export default App;
