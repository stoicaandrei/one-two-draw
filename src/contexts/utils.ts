export const randomId = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};

export const randomCode = () => {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
};
