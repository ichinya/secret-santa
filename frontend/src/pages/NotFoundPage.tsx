import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="rounded-3xl bg-white p-10 text-center shadow-lg">
      <h1 className="font-display text-4xl text-slate-900">404</h1>
      <p className="mt-4 text-slate-600">Страница не найдена. Возможно, она была перемещена или удалена.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        Вернуться на главную
      </Link>
    </section>
  );
}

export default NotFoundPage;
