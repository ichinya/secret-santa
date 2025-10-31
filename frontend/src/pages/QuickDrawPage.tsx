import { useState } from 'react';

interface ParticipantInput {
  name: string;
  email: string;
}

function QuickDrawPage() {
  const [participants, setParticipants] = useState<ParticipantInput[]>([{ name: '', email: '' }]);

  const addParticipant = () => {
    setParticipants((prev) => [...prev, { name: '', email: '' }]);
  };

  const updateParticipant = (index: number, field: keyof ParticipantInput, value: string) => {
    setParticipants((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };

  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-slate-900">Быстрая жеребьёвка</h1>
        <p className="text-slate-600">
          Добавьте до 100 участников по имени и e-mail. Мы мгновенно разошлём каждому личного подопечного.
        </p>
      </header>
      <form className="mt-8 space-y-6">
        <div className="grid gap-4">
          {participants.map((participant, index) => (
            <div key={index} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-2">
              <label className="flex flex-col text-sm font-semibold text-slate-600">
                Имя
                <input
                  required
                  type="text"
                  value={participant.name}
                  onChange={(event) => updateParticipant(index, 'name', event.target.value)}
                  className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="flex flex-col text-sm font-semibold text-slate-600">
                E-mail
                <input
                  required
                  type="email"
                  value={participant.email}
                  onChange={(event) => updateParticipant(index, 'email', event.target.value)}
                  className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={addParticipant}
            className="rounded-full border border-dashed border-primary px-4 py-2 text-sm font-semibold text-primary"
          >
            + Добавить участника
          </button>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Провести жеребьёвку
          </button>
        </div>
      </form>
    </section>
  );
}

export default QuickDrawPage;
