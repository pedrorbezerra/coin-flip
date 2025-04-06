import clsx from 'clsx';
import './App.css';
import { useRef, useState } from 'react';
import heads from './assets/heads.png';
import tails from './assets/tails.png';

function App() {
  const [flipping, setFlipping] = useState(false);
  const [currentFace, setCurrentFace] = useState('heads');

  const handleFlip = () => {
    setFlipping(true);
    setTimeout(() => {
      setFlipping(false);
      setCurrentFace(Math.random() < 0.5 ? 'heads' : 'tails');
    }, 1200);
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
    } else {
      // alert('arraste para cima');
    }

    startY.current = null;
  };
  return (
    <>
      <div
        className='wrapper flex flex-col place-content-stretch'
        onMouseDown={handleGesture}
        onMouseUp={handleEnd}
        onTouchStart={handleGesture}
        onTouchEnd={handleEnd}
      >
        <div className='flex justify-center flex-col items-center'>
          <h1 className='text-3xl font-extrabold mt-4 uppercase'>Cara ou Coroa</h1>
          <div className='px-4'>
            Arraste para cima para girar a moeda
            <span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-cyan-500 to bg-pink-500'>
              (igualzinho você faria com uma moeda real)
            </span>
          </div>
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
