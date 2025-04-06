import clsx from 'clsx';
import './App.css';
import { useRef, useState } from 'react';
import heads from './assets/heads.png';
import tails from './assets/tails.png';

function App() {
  const [flipping, setFlipping] = useState(false);
  const [currentFace, setCurrentFace] = useState('heads');
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

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
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-3xl font-extrabold uppercase'>Cara ou Coroa</h1>
          <div className='px-4 text-center font-medium'>
            Arraste para cima para girar a moeda
            <br />
            <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-500 to bg-pink-500'>
              (igualzinho você faria com uma moeda real)
            </span>
          </div>
        </div>

        <div className='flex justify-center relative'>
          <div
            className={clsx('fireworks-animation fireworks-animation-medium', {
              'fireworks-animation-medium--active': activeAnimation,
            })}
          />

          <span className='text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to bg-pink-500'>
            {result && (result === 'heads' ? 'Cara!' : 'Coroa!')}
          </span>
        </div>

        <div
          className={clsx('flip-box coin-circle flipping', {
            paused: !flipping,
          })}
        >
          <div className={clsx('flip-box-inner', { paused: !flipping })}>
            <div className='flip-box-front'>
              <img
                width={300}
                src={currentFace === 'heads' ? heads : tails}
                alt=''
                draggable={false}
              />
            </div>
            <div className='flip-box-back'>
              <img
                width={300}
                src={currentFace === 'heads' ? tails : heads}
                alt=''
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
