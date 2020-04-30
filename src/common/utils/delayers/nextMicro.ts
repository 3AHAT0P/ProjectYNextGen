import waitMicro from './waitMicro';

export default async (cb: cb): Promise<void> => {
  await waitMicro();
  await cb();
};
