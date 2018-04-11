export const generate = (min: number, max: number): number[] => {
  const numbers = [ ...Array(max - min) ].map((_, index) => index + min);
  return numbers;
};
