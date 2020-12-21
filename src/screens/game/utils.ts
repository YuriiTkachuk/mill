export interface Questions {
  question: string;
  correct: string[];
  wrong: string[];
}

export const randArray = (array: Questions[] | string[]) =>
  array[Math.floor(Math.random() * array.length)];
export const getQuestions = (array: string[]) => {
  let i = 0;
  const questions = [];
  let newArray = [...array];
  while (i !== 3) {
    const index = Math.floor(Math.random() * newArray.length);
    const question = newArray[index];
    questions.push(question);
    newArray = [...newArray.filter(v => v !== question)];
    i += 1;
  }

  return questions;
};

export const shuffle = (array: string[]) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

export const letters = ['A', 'B', 'C', 'D'];
export const scores = [
  '$1000000',
  '$500000',
  '$250000',
  '$125000',
  '$64000',
  '$32000',
  '$16000',
  '$8000',
  '$4000',
  '$2000',
  '$1000',
  '$500'
];
