export default (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));
