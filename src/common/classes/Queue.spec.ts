import {
  describe,
  beforeEach,
  expect,
  it,
} from '@jest/globals';

import Queue from './Queue';

describe('Queue', () => {
  describe('constructor', () => {
    it('Should create', () => {
      expect(new Queue()).not.toBeNull();
    });
    it('Should instance of Queue', () => {
      expect(new Queue()).toBeInstanceOf(Queue);
    });
  });

  describe('put', () => {
    let queue: Queue<{a: number}> = null;

    beforeEach(() => {
      queue = new Queue();
    });

    it('Should add when queue is empty', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 });
      expect(queue.length).toBe(1);
    });
    it('Should add when queue isn\'t empty', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 });
      queue.put({ a: 2 });
      expect(queue.length).toBe(2);
    });
    it('Should add return queue', () => {
      expect(queue.length).toBe(0);
      expect(
        queue
          .put({ a: 1 })
          .put({ a: 2 }),
      ).toBe(queue);
      expect(queue.length).toBe(2);
    });
  });

  describe('take', () => {
    let queue: Queue<{a: number}> = null;

    beforeEach(() => {
      queue = new Queue();
    });

    it('Should return null when queue is empty', () => {
      expect(queue.length).toBe(0);
      expect(queue.take()).toBeNull();
      expect(queue.length).toBe(0);
    });
    it('Should return elements in correct order', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 });
      queue.put({ a: 4 });
      queue.put({ a: 3 });
      expect(queue.length).toBe(3);
      expect(queue.take().a).toBe(1);
      queue.put({ a: 2 });
      expect(queue.take().a).toBe(4);
      queue.put({ a: 5 });
      expect(queue.take().a).toBe(3);
      expect(queue.take().a).toBe(2);
      expect(queue.take().a).toBe(5);
      expect(queue.length).toBe(0);
    });
  });
});
