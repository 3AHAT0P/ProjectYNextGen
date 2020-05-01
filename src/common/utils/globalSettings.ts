/* eslint-disable @typescript-eslint/no-explicit-any */
export default (): any => {
  let internalState: any = null;
  try {
    internalState = (globalThis as any).__internal__;
    if (internalState == null) {
      internalState = {};
      (globalThis as any).__internal__ = internalState;
    }
  } catch (e) {
    try {
      // eslint-disable-next-line no-restricted-globals
      internalState = (self as any).__internal__;
      if (internalState == null) {
        internalState = {};
        // eslint-disable-next-line no-restricted-globals
        (self as any).__internal__ = internalState;
      }
    } catch (err) {
      // eslint-disable-next-line no-restricted-globals
      internalState = (window as any).__internal__;
      if (internalState == null) {
        internalState = {};
        // eslint-disable-next-line no-restricted-globals
        (window as any).__internal__ = internalState;
      }
    }
  }
  return internalState;
};
