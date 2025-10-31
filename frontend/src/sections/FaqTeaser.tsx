import { Link } from 'react-router-dom';

const items = [
  {
    title: 'Организаторам',
    description: 'Как пригласить участников, настроить приватность и запустить жеребьёвку.'
  },
  {
    title: 'Общие вопросы',
    description: 'Ответы о подарках, бюджете, дедлайнах и уведомлениях.'
  },
  {
    title: 'О сервисе',
    description: 'Политика данных, безопасность и поддержка команды.'
  }
];

export function FaqTeaser() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="font-display text-3xl text-slate-900">Вопросы и ответы</h2>
          <p className="max-w-2xl text-slate-600">
            Мы собрали самые частые вопросы от организаторов и участников. Откройте FAQ, чтобы быстро найти решение.
          </p>
        </div>
        <Link
          to="/faq"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Перейти в FAQ
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{item.title}</p>
            <p className="mt-3 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
