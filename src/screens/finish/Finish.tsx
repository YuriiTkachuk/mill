import './Finish.scss';

import React from 'react';

import { Hand } from '../../assets/hand';

const Finish = ({ onStart, score }: { onStart: () => void; score: string }) => (
  <div className='finish'>
    <Hand />
    <div className='finish-info'>
      <span>Total score:</span>
      <h1>{score} earned</h1>
      <button type='button' onClick={onStart}>
        Try again
      </button>
    </div>
  </div>
);
export { Finish };
