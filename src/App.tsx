import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { RegistrationProvider } from './context/RegistrationContext';
import { Layout } from './components/layout/Layout';

// Public pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Conference } from './pages/Conference';
import { Speakers } from './pages/Speakers';
import { Partners } from './pages/Partners';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { StatementOfFaith } from './pages/StatementOfFaith';

// Admin CMS pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPages } from './pages/admin/AdminPages';
import { AdminPageEditor } from './pages/admin/AdminPageEditor';
import { AdminNavigation } from './pages/admin/AdminNavigation';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminFaqs } from './pages/admin/AdminFaqs';
import { AdminSpeakersPartners } from './pages/admin/AdminSpeakersPartners';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminActivity } from './pages/admin/AdminActivity';

export function App() {
  return (
    <BrowserRouter>
      <CMSProvider>
        <RegistrationProvider>
          <Routes>
            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin CMS Dashboard */}
            <Route path="/admin" element={<AdminLayout />}>
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
