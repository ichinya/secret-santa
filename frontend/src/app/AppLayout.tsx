import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
              SS
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-slate-900">Secret Santa</p>
              <p className="text-xs text-slate-500">Праздник круглый год</p>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
              Главная
            </NavLink>
            <NavLink to="/quick-draw" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
              Быстрая жеребьёвка
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
              FAQ
            </NavLink>
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
              Кабинет
            </NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              to="/account/login"
              className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Войти
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">{children}</main>
      <footer className="border-t border-slate-200 bg-white/70 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Secret Santa. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/support">Поддержать проект</Link>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/contact">Обратная связь</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
