export const copyArray = <T = unknown>(array: T[]): T[] => Array.from(array);

export const immutablePush = <T = unknown>(array: T[], item: T): T[] => {
  const newArray = array == null ? [] : copyArray(array);
  newArray.push(item);
  return newArray;
};
