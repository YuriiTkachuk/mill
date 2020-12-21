import './App.scss';

import React from 'react';

import { Finish } from './screens/finish/Finish';
import { Game } from './screens/game/Game';
import { Start } from './screens/start/Start';

const App = () => {
  const [page, setPage] = React.useState('');
  const [score, setScore] = React.useState('$500');
  const pageFromStorage = window.localStorage.getItem('page');
  const scoreFromStorage = window.localStorage.getItem('score');
  React.useEffect(() => {
    setPage(pageFromStorage || 'start');
  }, [pageFromStorage]);

  React.useEffect(() => {
    setScore(scoreFromStorage || '$500');
  }, [scoreFromStorage]);

  switch (page) {
    case 'start':
      return (
        <Start
          onStart={() => {
            setPage('game');
            window.localStorage.setItem('page', 'game');
          }}
        />
      );
    case 'game':
      return (
        <Game
          onFinish={data => {
            setScore(data);
            setPage('finish');
            window.localStorage.setItem('page', 'finish');
            window.localStorage.setItem('score', `${data}`);
          }}
        />
      );
    case 'finish':
      return (
        <Finish
          score={score}
          onStart={() => {
            setPage('game');
            window.localStorage.setItem('page', 'start');
          }}
        />
      );
    default:
      return <span>Loading</span>;
  }
};

export default App;
