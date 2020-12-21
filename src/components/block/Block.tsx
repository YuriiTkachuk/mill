import './Block.scss';

import React from 'react';

import { Option } from '../../assets/option';

const Block = ({
  content,
  isSelected,
  isWrong,
  isCorrect,
  letter,
  onSelect
}: {
  content: string;
  isSelected?: boolean;
  isWrong?: boolean;
  isCorrect?: boolean;
  letter: string;
  onSelect: () => void;
}) => {
  const [colors, setColors] = React.useState({
    stroke: '#D0D0D8',
    fill: 'white'
  });

  React.useEffect(() => {
    if (!isSelected) {
      return;
    }

    if (isCorrect) {
      setColors({
        stroke: '#47D867',
        fill: '#E6FAEA'
      });
      return;
    }

    if (isWrong) {
      setColors({
        stroke: '#EC6259',
        fill: '#FDEEED'
      });
      return;
    }

    if (isSelected) {
      setColors({
        stroke: '#FF8B37',
        fill: '#FFF3EB'
      });
    }
  }, [isSelected, isWrong, isCorrect]);

  return (
    <button type='button' className='block' onClick={onSelect}>
      <Option fill={colors.fill} stroke={colors.stroke} />
      <div className='block-content'>
        <b>{letter}</b>
        <span>{content}</span>
      </div>
    </button>
  );
};

Block.defaultProps = {
  isSelected: false,
  isWrong: false,
  isCorrect: false
};

export { Block };
