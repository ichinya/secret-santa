import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HowItWorks } from '../sections/HowItWorks';
import { FaqTeaser } from '../sections/FaqTeaser';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-24">
      <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-10 py-16 text-white shadow-xl lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="font-display text-4xl leading-tight md:text-5xl">{t('hero.title')}</h1>
          <p className="max-w-xl text-lg text-white/80">{t('hero.subtitle')}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/account/boxes/new"
              className="rounded-full bg-white px-6 py-3 font-semibold text-primary shadow hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              {t('actions.createBox')}
            </Link>
            <Link
              to="/quick-draw"
              className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              {t('actions.quickDraw')}
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl bg-white/15 p-6 text-sm">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-white/80">Почему Secret Santa?</h2>
          <ul className="space-y-3 text-white/90">
            <li>🎁 Гибкие лимиты и пожелания для любого бюджета.</li>
            <li>👪 Поддержка семейных и корпоративных игр.</li>
            <li>🌐 Приглашения по e-mail и соцсетям.</li>
            <li>🔐 Безопасность данных и приватность участников.</li>
          </ul>
        </div>
      </section>
      <HowItWorks />
      <FaqTeaser />
    </div>
  );
}

export default HomePage;
