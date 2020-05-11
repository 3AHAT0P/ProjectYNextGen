import {
  describe,
  beforeEach,
  expect,
  it,
  jest,
  afterAll,
} from '@jest/globals';

import bind from './bind';

describe('Decorator::bind', () => {
  it('Should bind context', () => {
    let sumCalled: boolean = false;
    let ctxCalled: boolean = false;

    class Test {
      public a: number = 40;

      @bind
      public sum(b: number): number {
        sumCalled = true;
        return this.a + b;
      }

      @bind
      public ctx(): this {
        ctxCalled = true;
        return this;
      }
    }

    const test = new Test();

    const { sum, ctx } = test;

    expect(sumCalled).toBe(false);
    expect(sum(2)).toBe(42);
    expect(sumCalled).toBe(true);
    expect(ctxCalled).toBe(false);
    expect(ctx()).toBe(test);
    expect(ctxCalled).toBe(true);
  });
});
