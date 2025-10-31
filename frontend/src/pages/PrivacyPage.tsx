function PrivacyPage() {
  return (
    <section className="space-y-6 rounded-3xl bg-white p-10 shadow-lg">
      <h1 className="font-display text-3xl text-slate-900">Политика конфиденциальности</h1>
      <p className="text-slate-600">
        Мы соблюдаем GDPR и обрабатываем персональные данные только для организации игры «Тайный Санта». Ниже описаны принципы хранения,
        удаления и защиты информации.
      </p>
      <article className="space-y-4 text-sm text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-800">Сбор данных</h2>
          <p>Мы собираем имя, e-mail, адрес и пожелания участников. Доступ к данным ограничен организатором и его подопечным.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800">Хранение</h2>
          <p>Данные хранятся в PostgreSQL с шифрованием на уровне диска и резервируются ежедневно в зашифрованном виде.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-800">Удаление</h2>
          <p>По запросу участника мы удаляем информацию в течение 30 дней и уведомляем всех заинтересованных сторон.</p>
        </section>
      </article>
    </section>
  );
}

export default PrivacyPage;
