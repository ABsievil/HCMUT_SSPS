import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <img
        src="src/images/icon-usa.png"
        alt="English"
        className="w-8 h-5 cursor-pointer"
        onClick={() => changeLanguage('en')}
      />
      <img
        src="src/images/icon-vietnam.png"
        alt="Tiếng Việt"
        className="w-8 h-5 cursor-pointer"
        onClick={() => changeLanguage('vi')}
      />
    </div>
  );
}

export default LanguageSwitcher;