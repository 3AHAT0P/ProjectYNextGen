import memoizee from 'memoizee';

export default (...keys: string[]) => (
  <T extends Function>(
    target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): TypedPropertyDescriptor<T> => {
    const originalFn = descriptor.value;

    return {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      get(): T {
        const innerWrapper = (...args: any[]): any => originalFn.apply(this, args.slice(keys.length));
        const memoizedMethod = memoizee(innerWrapper, { length: false });

        const outerWrapper = (...args: any[]): any => {
          const thisArgs: any[] = keys.map((key) => (this as any)[key]);
          return memoizedMethod(...[...thisArgs, ...args]);
        };

        Reflect.defineProperty(this, propertyKey, {
          ...descriptor,
          value: outerWrapper,
        });

        return outerWrapper as any;
      },
    };
  }
);
