import {
  describe,
  beforeEach,
  expect,
  it,
} from '@jest/globals';

import TwoWayLinkedList, { ITwoWayLinkedListNode } from './TwoWayLinkedList';

describe('TwoWayLinkedList', () => {
  describe('constructor', () => {
    it('Should create', () => {
      expect(new TwoWayLinkedList()).not.toBeNull();
    });
    it('Should instance of TwoWayLinkedList', () => {
      expect(new TwoWayLinkedList()).toBeInstanceOf(TwoWayLinkedList);
    });
  });

  describe('addToStart', () => {
    let list: TwoWayLinkedList<{a: number}> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
    });

    it('Should add when list is empty', () => {
      expect(list.length).toBe(0);
      list.addToStart({ a: 1 });
      expect(list.length).toBe(1);
    });
    it('Should add when list isn\'t empty', () => {
      expect(list.length).toBe(0);
      list.addToStart({ a: 1 });
      list.addToStart({ a: 2 });
      expect(list.length).toBe(2);
    });
    it('Should add return list', () => {
      expect(list.length).toBe(0);
      expect(
        list
          .addToStart({ a: 1 })
          .addToStart({ a: 2 }),
      ).toBe(list);
      expect(list.length).toBe(2);
    });
  });

  describe('addToEnd', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
    });

    it('Should add when list is empty', () => {
      expect(list.length).toBe(0);
      list.addToEnd({ a: 1 });
      expect(list.length).toBe(1);
    });
    it('Should add when list isn\'t empty', () => {
      expect(list.length).toBe(0);
      list.addToEnd({ a: 1 });
      list.addToEnd({ a: 2 });
      expect(list.length).toBe(2);
    });
    it('Should add return list', () => {
      expect(list.length).toBe(0);
      expect(
        list
          .addToEnd({ a: 1 })
          .addToEnd({ a: 2 }),
      ).toBe(list);
      expect(list.length).toBe(2);
    });
  });

  describe('pullOutOfStart', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
    });

    it('Should return null when list is empty', () => {
      expect(list.length).toBe(0);
      expect(list.pullOutOfStart()).toBeNull();
      expect(list.length).toBe(0);
    });
    it('Should return first when list isn\'t empty', () => {
      expect(list.length).toBe(0);
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
      expect(list.length).toBe(3);
      expect(list.pullOutOfStart().a).toBe(1);
      expect(list.length).toBe(2);
      expect(list.pullOutOfStart().a).toBe(2);
      expect(list.length).toBe(1);
      expect(list.pullOutOfStart().a).toBe(3);
      expect(list.length).toBe(0);
      expect(list.pullOutOfStart()).toBe(null);
      expect(list.length).toBe(0);
    });
  });

  describe('pullOutOfEnd', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
    });

    it('Should return null when list is empty', () => {
      expect(list.length).toBe(0);
      expect(list.pullOutOfEnd()).toBeNull();
      expect(list.length).toBe(0);
    });
    it('Should return last when list isn\'t empty', () => {
      expect(list.length).toBe(0);
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
      expect(list.length).toBe(3);
      expect(list.pullOutOfEnd().a).toBe(3);
      expect(list.length).toBe(2);
      expect(list.pullOutOfEnd().a).toBe(2);
      expect(list.length).toBe(1);
      expect(list.pullOutOfEnd().a).toBe(1);
      expect(list.length).toBe(0);
      expect(list.pullOutOfEnd()).toBe(null);
      expect(list.length).toBe(0);
    });
  });

  describe('toArray', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
    });

    it('Should return empty array when list is empty', () => {
      expect(list.length).toBe(0);
      expect(list.toArray()).toStrictEqual([]);
      expect(list.length).toBe(0);
    });
    it('Should return valid data array when list isn\'t empty', () => {
      expect(list.length).toBe(0);
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
      expect(list.length).toBe(3);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
      expect(list.length).toBe(3);
    });
  });

  describe('find', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
    });

    it('Should return null when not found', () => {
      expect(list.length).toBe(3);
      expect(list.find((node: ITwoWayLinkedListNode<{ a: number }>) => node.data.a === 4)).toBeNull();
      expect(list.length).toBe(3);
    });
    it('Should return node when found', () => {
      expect(list.length).toBe(3);
      expect(list.find((node: ITwoWayLinkedListNode<{ a: number }>) => node.data.a === 2).data.a).toBe(2);
      expect(list.length).toBe(3);
    });
  });

  describe('addAfter', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
    });

    it('Should throw when first argue is null', () => {
      expect(() => list.addBefore(null, { a: 4 })).toThrow();
    });
    it('Should correct add new data after first node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 1);
      expect(list.length).toBe(3);
      list.addAfter(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 4 }, { a: 2 }, { a: 3 }]);
    });
    it('Should correct add new data after node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 2);
      expect(list.length).toBe(3);
      list.addAfter(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 4 }, { a: 3 }]);
    });
    it('Should correct add new data after last node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 3);
      expect(list.length).toBe(3);
      list.addAfter(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
    });
  });

  describe('addBefore', () => {
    let list: TwoWayLinkedList<{ a: number }> = null;

    beforeEach(() => {
      list = new TwoWayLinkedList();
      list.addToStart({ a: 2 });
      list.addToEnd({ a: 3 });
      list.addToStart({ a: 1 });
    });

    it('Should throw when first argue is null', () => {
      expect(() => list.addBefore(null, { a: 4 })).toThrow();
    });
    it('Should correct add new data before first node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 1);
      expect(list.length).toBe(3);
      list.addBefore(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 4 }, { a: 1 }, { a: 2 }, { a: 3 }]);
    });
    it('Should correct add new data before node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 2);
      expect(list.length).toBe(3);
      list.addBefore(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 4 }, { a: 2 }, { a: 3 }]);
    });
    it('Should correct add new data before last node', () => {
      const node = list.find((_node: ITwoWayLinkedListNode<{ a: number }>) => _node.data.a === 3);
      expect(list.length).toBe(3);
      list.addBefore(node, { a: 4 });
      expect(list.length).toBe(4);
      expect(list.toArray()).toStrictEqual([{ a: 1 }, { a: 2 }, { a: 4 }, { a: 3 }]);
    });
  });
});
