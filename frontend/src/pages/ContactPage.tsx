function ContactPage() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <h1 className="font-display text-3xl text-slate-900">Обратная связь</h1>
      <p className="mt-2 text-slate-600">Напишите нам о проблемах или предложениях. Мы отвечаем в будни с 10:00 до 19:00 МСК.</p>
      <form className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm font-semibold text-slate-600">
          Имя
          <input className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <label className="flex flex-col text-sm font-semibold text-slate-600">
          E-mail
          <input type="email" className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <label className="md:col-span-2 flex flex-col text-sm font-semibold text-slate-600">
          Сообщение
          <textarea rows={4} className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <button
          type="submit"
          className="md:col-span-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Отправить
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
