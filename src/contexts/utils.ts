export const randomId = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};

export const randomCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};

export const shuffle = (array?: any[]) => {
  if (!array) return [];

  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
