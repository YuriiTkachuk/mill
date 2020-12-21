import './Start.scss';

import React from 'react';

import { Hand } from '../../assets/hand';

const Start = ({ onStart }: { onStart: () => void }) => (
  <div className='start'>
    <Hand />
    <div className='start-info'>
      <h1>Who wants to be a millionaire?</h1>
      <button type='button' onClick={onStart}>
        Start
      </button>
    </div>
  </div>
);
export { Start };
