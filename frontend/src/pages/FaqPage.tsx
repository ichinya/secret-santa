import { useState } from 'react';

const categories = {
  organizers: {
    title: 'Организаторам',
    items: [
      { question: 'Как запустить жеребьёвку?', answer: 'После того как все участники подтвердят карточки, нажмите «Жеребьёвка» в настройках коробки.' },
      { question: 'Можно ли добавлять участников вручную?', answer: 'Да, добавьте e-mail в мастере или пришлите ссылку на регистрацию.' }
    ]
  },
  general: {
    title: 'Общие',
    items: [
      { question: 'Как изменить лимит подарка?', answer: 'Организатор может отредактировать стоимость до жеребьёвки в настройках коробки.' },
      { question: 'Что делать, если письмо не пришло?', answer: 'Проверьте папку «Спам» или воспользуйтесь страницей «Не пришло письмо?», чтобы отправить повторно.' }
    ]
  },
  about: {
    title: 'О сервисе',
    items: [
      { question: 'Где хранятся данные?', answer: 'Все данные размещаются в защищённом кластере в ЕС и могут быть удалены по запросу.' },
      { question: 'Можно ли поддержать проект?', answer: 'Да, на странице «Поддержать проект» указаны способы перевода: YooMoney, карта и МТС.' }
    ]
  }
} as const;

type CategoryKey = keyof typeof categories;

function FaqPage() {
  const [active, setActive] = useState<CategoryKey>('organizers');
  const [openIndexes, setOpenIndexes] = useState<Record<CategoryKey, number | null>>({
    organizers: 0,
    general: null,
    about: null
  });

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => ({ ...prev, [active]: prev[active] === index ? null : index }));
  };

  const activeCategory = categories[active];

  return (
    <section className="rounded-3xl bg-white p-10 shadow-lg">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl text-slate-900">FAQ</h1>
          <p className="text-slate-600">Собрали ответы на самые частые вопросы от организаторов и участников.</p>
        </div>
        <div className="flex gap-3 rounded-full bg-slate-100 p-2 text-sm font-semibold text-slate-600">
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`rounded-full px-5 py-2 transition ${active === key ? 'bg-white text-primary shadow' : ''}`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>
      </header>
      <dl className="mt-8 space-y-4">
        {activeCategory.items.map((item, index) => {
          const open = openIndexes[active] === index;
          return (
            <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50/60">
              <dt>
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-base font-semibold text-slate-800"
                >
                  {item.question}
                  <span className="text-xl">{open ? '−' : '+'}</span>
                </button>
              </dt>
              {open ? <dd className="px-6 pb-6 text-sm text-slate-600">{item.answer}</dd> : null}
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export default FaqPage;
