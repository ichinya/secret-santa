function ArchivePage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl text-slate-900">Архив и удаление</h2>
        <p className="text-sm text-slate-600">Управляйте прошлыми играми или удалите аккаунт по стандартам GDPR.</p>
      </header>
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800">Архивированные коробки</h3>
          <p className="mt-2 text-sm text-slate-600">Перемещайте завершённые игры в архив для сохранения истории.</p>
          <button className="mt-4 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-primary">
            Открыть архив
          </button>
        </section>
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-lg font-semibold text-red-700">Удаление профиля</h3>
          <p className="mt-2 text-sm text-red-600">
            Введите фразу «Хочу удалить свой профиль» и подтвердите действие. Мы удалим данные в течение 30 дней.
          </p>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Хочу удалить свой профиль"
              className="w-full rounded-lg border border-red-200 px-3 py-2 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <button className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-red-600">
              Удалить аккаунт
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ArchivePage;
