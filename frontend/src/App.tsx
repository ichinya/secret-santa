import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { AppLayout } from './app/AppLayout';
import HomePage from './pages/HomePage';
import QuickDrawPage from './pages/QuickDrawPage';
import FaqPage from './pages/FaqPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ResendEmailPage from './pages/ResendEmailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="py-16 text-center text-lg">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quick-draw" element={<QuickDrawPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/account/*" element={<DashboardPage />} />
          <Route path="/resend" element={<ResendEmailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
