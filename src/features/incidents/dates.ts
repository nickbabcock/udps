export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const todaysDate = () => {
  const today = new Date();
  return formatDate(today);
};
