import {
  describe,
  beforeEach,
  expect,
  it,
} from '@jest/globals';

import PriorityQueue from './PriorityQueue';

describe('PriorityQueue', () => {
  describe('constructor', () => {
    it('Should create', () => {
      expect(new PriorityQueue()).not.toBeNull();
    });
    it('Should instance of PriorityQueue', () => {
      expect(new PriorityQueue()).toBeInstanceOf(PriorityQueue);
    });
  });

  describe('put', () => {
    let queue: PriorityQueue<{a: number}> = null;

    beforeEach(() => {
      queue = new PriorityQueue();
    });

    it('Should add when queue is empty', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 }, 0);
      expect(queue.length).toBe(1);
    });
    it('Should add when queue isn\'t empty', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 }, 0);
      queue.put({ a: 2 }, 0);
      expect(queue.length).toBe(2);
    });
    it('Should add return queue', () => {
      expect(queue.length).toBe(0);
      expect(
        queue
          .put({ a: 1 }, 1)
          .put({ a: 2 }, 0),
      ).toBe(queue);
      expect(queue.length).toBe(2);
    });
  });

  describe('take', () => {
    let queue: PriorityQueue<{a: number}> = null;

    beforeEach(() => {
      queue = new PriorityQueue();
    });

    it('Should return null when queue is empty', () => {
      expect(queue.length).toBe(0);
      expect(queue.take()).toBeNull();
      expect(queue.length).toBe(0);
    });
    it('Should return elements in ASC order', () => {
      expect(queue.length).toBe(0);
      queue.put({ a: 1 }, 1);
      queue.put({ a: 2 }, 0);
      queue.put({ a: 3 }, 2);
      queue.put({ a: 4 }, 1);
      expect(queue.length).toBe(4);
      expect(queue.take().a).toBe(2);
      expect(queue.take().a).toBe(1);
      expect(queue.take().a).toBe(4);
      queue.put({ a: 5 }, 5);
      expect(queue.take().a).toBe(3);
      expect(queue.take().a).toBe(5);
      expect(queue.length).toBe(0);
    });
    it('Should return elements in DESC order', () => {
      queue = new PriorityQueue('DESC');
      expect(queue.length).toBe(0);
      queue.put({ a: 1 }, 1);
      queue.put({ a: 2 }, 0);
      queue.put({ a: 3 }, 2);
      queue.put({ a: 4 }, 1);
      expect(queue.length).toBe(4);
      expect(queue.take().a).toBe(3);
      expect(queue.take().a).toBe(1);
      expect(queue.take().a).toBe(4);
      queue.put({ a: 5 }, 5);
      expect(queue.take().a).toBe(5);
      expect(queue.take().a).toBe(2);
      expect(queue.length).toBe(0);
    });
  });
});
