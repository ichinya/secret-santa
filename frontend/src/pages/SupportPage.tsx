const options = [
  { id: 'yoomoney', label: 'YooMoney', description: 'Быстрый перевод по номеру кошелька 4100 XXXX XXXX XXXX' },
  { id: 'card', label: 'Банковская карта', description: 'Номер карты: 5559 XXXX XXXX 1234, получатель Иван П.' },
  { id: 'mts', label: 'МТС', description: 'Телефон для пополнения: +7 999 000-00-00' }
];

function SupportPage() {
  return (
    <section className="space-y-6 rounded-3xl bg-white p-10 shadow-lg">
      <h1 className="font-display text-3xl text-slate-900">Поддержать проект</h1>
      <p className="text-slate-600">Выберите удобный способ. Все пожертвования идут на развитие инфраструктуры и поддержку команды.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <div key={option.id} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800">{option.label}</h2>
            <p className="mt-2 text-sm text-slate-600">{option.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[100, 300, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
                >
                  {amount} ₽
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SupportPage;
