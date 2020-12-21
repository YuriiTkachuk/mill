import './Game.scss';

import React from 'react';

import { Close } from '../../assets/close';
import { Hamburger } from '../../assets/hamburger';
import { Block } from '../../components/block/Block';
import { Step } from '../../components/step/Step';
import data from '../../config/data.json';
import {
  getQuestions,
  letters,
  Questions,
  randArray,
  scores,
  shuffle
} from './utils';

const Game = ({ onFinish }: { onFinish: (score: string) => void }) => {
  const valueFromStorage = window.localStorage.getItem('questionsData');
  const currentQuestionIndex = window.localStorage.getItem(
    'currentQuestionIndex'
  );
  const [currentIndex, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState('');
  const [isCorrect, setCorrect] = React.useState(false);
  const [isWrong, setWrong] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setIndex(+(currentQuestionIndex || 0));
  }, [currentQuestionIndex]);

  const questionsData = React.useMemo(() => {
    if (valueFromStorage) {
      return JSON.parse(valueFromStorage);
    }

    const parsedData = Object.entries(data).map(level => {
      const [name, questions] = level;
      const randQuestion = randArray(questions) as Questions;
      const answer = randArray(randQuestion.correct);
      const currentQuestion = {
        text: randQuestion.question,
        answer,
        values: [answer, ...getQuestions(randQuestion.wrong)]
      };
      return {
        name,
        currentQuestion
      };
    });

    window.localStorage.setItem('questionsData', JSON.stringify(parsedData));

    return parsedData;
  }, [valueFromStorage]);

  const onSelect = (content: string) => {
    setSelected(content);
    const isCorrectAnswer =
      questionsData[currentIndex].currentQuestion.answer === content;

    const selectedTimeout = setTimeout(() => {
      setCorrect(isCorrectAnswer);
      setWrong(!isCorrectAnswer);
      clearTimeout(selectedTimeout);
    }, 1000);

    const indexTimeout = setTimeout(() => {
      if (currentIndex === 11 || !isCorrectAnswer) {
        const skipIndex = currentIndex === 11 ? 1 : 0;
        onFinish(scores[scores.length - currentIndex - skipIndex] || '$0');
        setIndex(0);
        window.localStorage.removeItem('questionsData');
        window.localStorage.removeItem('currentQuestionIndex');
      } else {
        setIndex(currentIndex + 1);
        window.localStorage.setItem(
          'currentQuestionIndex',
          `${currentIndex + 1}`
        );
      }
      clearTimeout(indexTimeout);
      setSelected('');
      setCorrect(false);
      setWrong(false);
    }, 2000);
  };

  const variants = React.useMemo(
    () => shuffle(questionsData[currentIndex].currentQuestion.values),
    [currentIndex, questionsData]
  );

  return (
    <div className='game'>
      <div
        className='game-content'
        style={
          window.innerWidth < 766 ? { display: open ? 'none' : 'flex' } : {}
        }
      >
        <button
          className='game-hamburger'
          type='button'
          onClick={() => setOpen(true)}
        >
          <Hamburger />
        </button>
        <span className='game-content-question'>
          {questionsData[currentIndex].currentQuestion.text}
        </span>
        <div className='game-content-variants'>
          {variants.map((content, key) => (
            <Block
              key={content}
              content={content}
              letter={letters[key]}
              onSelect={() => !selected && onSelect(content)}
              isSelected={selected === content}
              isCorrect={isCorrect}
              isWrong={isWrong}
            />
          ))}
        </div>
      </div>
      <div
        className='game-score'
        style={
          window.innerWidth < 766 ? { display: open ? 'flex' : 'none' } : {}
        }
      >
        <button
          className='game-close'
          type='button'
          onClick={() => setOpen(false)}
        >
          <Close />
        </button>
        {scores.map((score, index) => (
          <Step
            key={score}
            content={score}
            isActive={scores.length - index - 1 === currentIndex}
            isPassed={scores.length - index - 1 < currentIndex}
          />
        ))}
      </div>
    </div>
  );
};
export { Game };
