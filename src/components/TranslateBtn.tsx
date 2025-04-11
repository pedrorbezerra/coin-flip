import { useTranslations } from '../hooks/useTranslations';

const TranslateBtn = () => {
  const { currentLang, setCurrentLang } = useTranslations();
  return (
    <div className='absolute bottom-4 right-4'>
      <button
        onClick={() => setCurrentLang(currentLang === 'en' ? 'ptBr' : 'en')}
        className='w-12 h-12 !rounded-full flex items-center justify-center'
      >
        <span className='text-3xl'>{currentLang === 'en' ? '🇧🇷' : '🇺🇸'}</span>
      </button>
    </div>
  );
};

export default TranslateBtn;
