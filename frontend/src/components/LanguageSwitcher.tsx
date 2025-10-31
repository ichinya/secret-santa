import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`rounded-full px-2 py-1 transition ${i18n.language === lang.code ? 'bg-white text-primary shadow' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
