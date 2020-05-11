/* eslint-disable class-methods-use-this */
import {
  describe,
  beforeEach,
  expect,
  it,
  jest,
  afterAll,
} from '@jest/globals';

import memo from './memo';

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

const generateUser = () => {
  const id: number = Math.random() * 1.e5;
  return {
    id,
    firstName: `John-${id}`,
    lastName: `Smith-${id}`,
  };
};

describe('Decorator::memo', () => {
  it('Should momoize method', () => {
    let sumIsCalled: boolean = false;
    let getUserByIdIsCalled: boolean = false;

    class Test {
      public users: IUser[] = Array.from(Array(5), generateUser);

      @memo()
      public sum(a: number, b: number): number {
        sumIsCalled = true;
        return a + b;
      }

      @memo('users')
      public getUserById(id: number): IUser {
        getUserByIdIsCalled = true;
        return this.users.find((user) => user.id === id);
      }
    }

    const test = new Test();

    expect(sumIsCalled).toBe(false);
    expect(test.sum(1, 1)).toBe(2);
    expect(sumIsCalled).toBe(true);
    sumIsCalled = false;
    expect(sumIsCalled).toBe(false);
    expect(test.sum(1, 1)).toBe(2);
    expect(sumIsCalled).toBe(false);
    expect(sumIsCalled).toBe(false);
    expect(test.sum(1, 2)).toBe(3);
    expect(sumIsCalled).toBe(true);

    expect(getUserByIdIsCalled).toBe(false);
    expect(test.getUserById(test.users[2].id)).toStrictEqual(test.users[2]);
    expect(getUserByIdIsCalled).toBe(true);

    getUserByIdIsCalled = false;
    expect(getUserByIdIsCalled).toBe(false);
    expect(test.getUserById(test.users[2].id)).toStrictEqual(test.users[2]);
    expect(getUserByIdIsCalled).toBe(false);

    getUserByIdIsCalled = false;
    expect(getUserByIdIsCalled).toBe(false);
    expect(test.getUserById(test.users[0].id)).toStrictEqual(test.users[0]);
    expect(getUserByIdIsCalled).toBe(true);

    getUserByIdIsCalled = false;
    const tmpUser = test.users[2];
    test.users = [];
    expect(getUserByIdIsCalled).toBe(false);
    expect(test.getUserById(tmpUser.id)).not.toStrictEqual(tmpUser);
    expect(getUserByIdIsCalled).toBe(true);
  });
});
