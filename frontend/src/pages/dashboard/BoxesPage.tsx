const boxes = [
  {
    id: '1',
    name: 'Зимняя магия',
    participants: 12,
    status: 'matched',
    role: 'Организатор'
  },
  {
    id: '2',
    name: 'Летняя вечеринка',
    participants: 8,
    status: 'draft',
    role: 'Участник'
  }
];

function BoxesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-slate-900">Мои коробки</h2>
          <p className="text-sm text-slate-600">Управляйте активными играми и архивом.</p>
        </div>
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:-translate-y-0.5 hover:shadow-lg">
          Создать коробку
        </button>
      </header>
      <div className="grid gap-4">
        {boxes.map((box) => (
          <article key={box.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{box.name}</h3>
              <p className="text-sm text-slate-500">{box.participants} участников · статус: {box.status}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">{box.role}</span>
              <button className="rounded-full border border-slate-200 px-4 py-2 hover:border-primary">Открыть</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BoxesPage;
