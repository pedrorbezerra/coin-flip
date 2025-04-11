import clsx from 'clsx';
import heads from '../assets/heads.png';
import tails from '../assets/tails.png';

interface CoinProps {
  isFliping: boolean;
  currentFace: 'heads' | 'tails';
}
const Coin = ({ isFliping, currentFace }: CoinProps) => {
  return (
    <div
      className={clsx('flip-box coin-circle flipping', {
        paused: !isFliping,
      })}
    >
      <div className={clsx('flip-box-inner', { paused: !isFliping })}>
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
  );
};

export default Coin;
