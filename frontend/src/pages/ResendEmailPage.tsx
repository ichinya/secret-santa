function ResendEmailPage() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <h1 className="font-display text-3xl text-slate-900">Не пришло письмо?</h1>
      <p className="mt-2 text-slate-600">Введите свой e-mail и мы повторно отправим приглашение или ссылку на вход.</p>
      <form className="mt-6 space-y-4 max-w-md">
        <label className="flex flex-col text-sm font-semibold text-slate-600">
          E-mail
          <input
            type="email"
            required
            className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Отправить повторно
        </button>
      </form>
    </section>
  );
}

export default ResendEmailPage;
