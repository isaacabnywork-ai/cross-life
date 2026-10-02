import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Conference } from './pages/Conference';
import { Speakers } from './pages/Speakers';
import { Partners } from './pages/Partners';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { StatementOfFaith } from './pages/StatementOfFaith';

export function App() {
  return (
    <BrowserRouter>
      <RegistrationProvider>
        <Layout>
          <Routes>
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
          </Routes>
        </Layout>
      </RegistrationProvider>
    </BrowserRouter>
  );
}

export default App;
