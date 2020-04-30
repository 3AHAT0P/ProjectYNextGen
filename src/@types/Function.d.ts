declare global {
  type fn<T = unknown> = (...args: unknown[]) => T;
  type cb = fn;
}

export { };
