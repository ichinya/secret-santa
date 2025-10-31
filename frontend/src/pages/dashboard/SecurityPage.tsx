function SecurityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl text-slate-900">Безопасность</h2>
        <p className="text-sm text-slate-600">Настройте пароль и двухфакторную защиту.</p>
      </header>
      <form className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col text-sm font-semibold text-slate-600">
            Новый пароль
            <input type="password" className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
          <label className="flex flex-col text-sm font-semibold text-slate-600">
            Повторите пароль
            <input type="password" className="mt-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-800">Двухфакторная аутентификация</p>
          <p className="text-sm text-slate-500">Подключите Telegram-бота, чтобы подтверждать входы кодом.</p>
          <button className="mt-4 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary">
            Активировать 2FA
          </button>
        </div>
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Обновить пароль
        </button>
      </form>
    </div>
  );
}

export default SecurityPage;
