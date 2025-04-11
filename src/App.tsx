import clsx from 'clsx';
import './App.css';
import { useRef, useState } from 'react';

import { useTranslations } from './hooks/useTranslations';
import Coin from './components/Coin';

function App() {
  const [flipping, setFlipping] = useState(false);
  const [currentFace, setCurrentFace] = useState<'heads' | 'tails'>('heads');
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const { t, currentLang, setCurrentLang } = useTranslations();

  const handleFlip = () => {
    setResult(null);
    setFlipping(true);
    setTimeout(() => {
      setFlipping(false);
      const result = Math.random() < 0.5 ? 'heads' : 'tails';
      setCurrentFace(result);
      handleResult(result);
    }, 1200);
  };

  const handleResult = (result: 'heads' | 'tails') => {
    setActiveAnimation(true);

    setTimeout(() => {
      setActiveAnimation(false);
      setResult(result);
    }, 1000);
  };

  const startY = useRef<number | null>(null);

  const handleGesture = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = e.clientY;
    }
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    let endY;

    if ('changedTouches' in e) {
      endY = e.changedTouches[0].clientY;
    } else {
      endY = e.clientY;
    }

    if (startY.current !== null && startY.current - endY > 30) {
      handleFlip();
    }

    startY.current = null;
  };
  return (
    <>
      <div
        className='wrapper flex flex-col justify-between py-8'
        onMouseDown={handleGesture}
        onMouseUp={handleEnd}
        onTouchStart={handleGesture}
        onTouchEnd={handleEnd}
      >
        <div className='flex justify-center flex-col items-center text-[#352f36]'>
          <h1 className='text-3xl font-extrabold uppercase'>{t('title')}</h1>
          <div className='px-4 text-center font-medium'>
            {t('subtitle')}
            <br />
            <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-500 to bg-pink-500'>
              ({t('disclaimer')})
            </span>
          </div>
        </div>

        <div className='absolute bottom-4 right-4'>
          <button
            onClick={() => setCurrentLang(currentLang === 'en' ? 'ptBr' : 'en')}
            className='w-12 h-12 !rounded-full flex items-center justify-center'
          >
            <span className='text-3xl'>
              {currentLang === 'en' ? '🇧🇷' : '🇺🇸'}
            </span>
          </button>
        </div>

        <div className='flex justify-center relative'>
          <div
            className={clsx('fireworks-animation fireworks-animation-medium', {
              'fireworks-animation-medium--active': activeAnimation,
            })}
          />

          <span className='text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to bg-pink-500'>
            {result && (result === 'heads' ? t('heads') : t('tails'))}
          </span>
        </div>

        <Coin isFliping={flipping} currentFace={currentFace} />
      </div>
    </>
  );
}

export default App;
