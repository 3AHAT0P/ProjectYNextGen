import { immutablePush } from './arrayHelpers';

export const inheritanceSequanceKey = Symbol('_metaClassNames');

export interface IWithInheritanceSequance {
  [inheritanceSequanceKey]?: Array<symbol | string>;
}

export const updateInheritanceSequance = (
  Class: IWithInheritanceSequance,
  BaseClass: IWithInheritanceSequance,
  ClassName: string | symbol,
): void => {
  let newSequance = [];
  if (BaseClass == null) newSequance = immutablePush([], ClassName);
  else newSequance = immutablePush(BaseClass[inheritanceSequanceKey], ClassName);
  /* eslint-disable-next-line no-param-reassign */
  Class[inheritanceSequanceKey] = newSequance;
};

export const checkInheritanceSequance = (Class: IWithInheritanceSequance, ClassName: string | symbol): boolean => {
  if (!Array.isArray(Class[inheritanceSequanceKey])) return false;

  return Class[inheritanceSequanceKey].includes(ClassName);
};
