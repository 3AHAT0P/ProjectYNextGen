export default <T extends Function>(
  target: unknown,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> => (
  {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get(): T {
      const bindedMethod = descriptor.value.bind(this);
      Reflect.defineProperty(this, propertyKey, {
        ...descriptor,
        value: bindedMethod,
      });

      return bindedMethod;
    },
  }
);
