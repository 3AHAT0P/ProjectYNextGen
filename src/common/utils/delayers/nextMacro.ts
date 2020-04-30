import waitMacro from './waitMacro';

export default async (cb: cb): Promise<void> => {
  await waitMacro(1);
  await cb();
};
