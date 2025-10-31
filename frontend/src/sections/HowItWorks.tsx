import { useTranslation } from 'react-i18next';

const icons = ['🧰', '📨', '🎲', '✨'];

export function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true }) as string[];

  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <h2 className="font-display text-3xl font-semibold text-slate-900">{t('howItWorks.title')}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-6">
            <span className="text-3xl">{icons[index]}</span>
            <p className="text-base text-slate-700">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
