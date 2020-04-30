export default (): string => {
  let result = '';
  for (let i = 0; i < 32; i += 1) {
    if (i === 8 || i === 12 || i === 16 || i === 20) result += '-';
    // eslint-disable-next-line no-bitwise
    const random = Math.random() * 16 | 0;
    // eslint-disable-next-line no-nested-ternary, no-mixed-operators, no-bitwise
    result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return result;
};
