function NotificationsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl text-slate-900">Уведомления</h2>
        <p className="text-sm text-slate-600">Выберите каналы и частоту рассылок.</p>
      </header>
      <form className="space-y-6">
        <div className="space-y-3">
          {[
            { id: 'email', label: 'E-mail', description: 'Приглашения, напоминания, результаты жеребьёвки.' },
            { id: 'vk', label: 'VK', description: 'Личные сообщения в сообществе.' },
            { id: 'telegram', label: 'Telegram', description: 'Бот-напоминания о дедлайнах.' }
          ].map((channel) => (
            <label key={channel.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30" />
              <div>
                <p className="font-semibold text-slate-800">{channel.label}</p>
                <p className="text-sm text-slate-500">{channel.description}</p>
              </div>
            </label>
          ))}
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

export default NotificationsPage;
