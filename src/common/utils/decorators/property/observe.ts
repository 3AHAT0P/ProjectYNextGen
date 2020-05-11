export default <T>(
  target: unknown,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> | void => {
  return descriptor;
};
