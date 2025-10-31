import { NavLink, Route, Routes } from 'react-router-dom';
import ProfilePage from './dashboard/ProfilePage';
import BoxesPage from './dashboard/BoxesPage';
import NotificationsPage from './dashboard/NotificationsPage';
import SecurityPage from './dashboard/SecurityPage';
import ArchivePage from './dashboard/ArchivePage';

function DashboardPage() {
  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-6">
        <nav className="space-y-4 text-sm font-semibold text-slate-600">
          <NavLink to="profile" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Профиль
          </NavLink>
          <NavLink to="boxes" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Мои коробки
          </NavLink>
          <NavLink to="notifications" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Уведомления
          </NavLink>
          <NavLink to="security" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Безопасность
          </NavLink>
          <NavLink to="archive" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Архив и удаление
          </NavLink>
        </nav>
      </aside>
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <Routes>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="boxes" element={<BoxesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="*" element={<ProfilePage />} />
        </Routes>
      </section>
    </div>
  );
}

export default DashboardPage;
