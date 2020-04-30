export default (): Promise<void> => new Promise(queueMicrotask);
