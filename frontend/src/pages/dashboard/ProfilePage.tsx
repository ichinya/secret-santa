function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="font-display text-2xl text-slate-900">Профиль</h2>
        <p className="text-sm text-slate-600">Обновите имя, e-mail и подключите соцсети.</p>
      </header>
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col text-sm font-semibold text-slate-600">
            Имя
            <input className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
          <label className="flex flex-col text-sm font-semibold text-slate-600">
            E-mail
            <input className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
        </div>
        <div className="grid gap-4">
          <p className="text-sm font-semibold text-slate-600">Привязка соцсетей</p>
          <div className="grid gap-3 md:grid-cols-3">
            {['Google', 'VK', 'Telegram'].map((provider) => (
              <button
                key={provider}
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-primary"
              >
                Подключить {provider}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
