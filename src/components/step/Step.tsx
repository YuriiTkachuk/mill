import './Step.scss';

import React from 'react';

import { Price } from '../../assets/price';

const Step = ({
  content,
  isActive,
  isPassed
}: {
  content: string;
  isActive: boolean;
  isPassed: boolean;
}) => {
  const [colors, setColors] = React.useState({
    stroke: '#D0D0D8',
    color: '#1C1C21'
  });

  React.useEffect(() => {
    if (isActive) {
      setColors({
        stroke: '#FF8B37',
        color: '#FF8B37'
      });
      return;
    }

    if (isPassed) {
      setColors({
        stroke: '#D0D0D8',
        color: '#D0D0D8'
      });
    }
  }, [isPassed, isActive]);

  return (
    <button type='button' className='step'>
      <Price stroke={colors.stroke} />
      <div className='step-content'>
        <span style={{ color: colors.color }}>{content}</span>
      </div>
    </button>
  );
};

export { Step };
