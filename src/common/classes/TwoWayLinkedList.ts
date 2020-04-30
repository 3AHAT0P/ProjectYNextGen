export interface ITwoWayLinkedListNode<T> {
  data: T;
  next: ITwoWayLinkedListNode<T>;
  prev: ITwoWayLinkedListNode<T>;
}

const buildNode = <T>(
  data: T,
  prev: ITwoWayLinkedListNode <T> = null,
  next: ITwoWayLinkedListNode <T> = null,
): ITwoWayLinkedListNode <T> => ({ data, prev, next });

export default class TwoWayLinkedList<T> {
  private _head: ITwoWayLinkedListNode<T> = null;
  private _tail: ITwoWayLinkedListNode<T> = null;
  private _length: number = 0;

  get length(): number { return this._length; }

  public addToStart(data: T): this {
    if (this._length === 0) {
      this._head = buildNode(data);
      this._tail = this._head;
    } else {
      this._head = buildNode(data, null, this._head);
      this._head.next.prev = this._head;
    }
    this._length += 1;
    return this;
  }

  public addToEnd(data: T): this {
    if (this._length === 0) {
      this._tail = buildNode(data);
      this._head = this._tail;
    } else {
      this._tail = buildNode(data, this._tail, null);
      this._tail.prev.next = this._tail;
    }
    this._length += 1;
    return this;
  }

  public pullOutOfStart(): T {
    let data: T = null;
    if (this._length > 0) {
      data = this._head.data;
      if (this._length === 1) {
        this._head = null;
        this._tail = null;
      } else {
        this._head = this._head.next;
        this._head.prev = null;
      }
      this._length -= 1;
    }
    return data;
  }

  public pullOutOfEnd(): T {
    let data: T = null;
    if (this._length > 0) {
      data = this._tail.data;
      if (this._length === 1) {
        this._head = null;
        this._tail = null;
      } else {
        this._tail = this._tail.prev;
        this._tail.next = null;
      }
      this._length -= 1;
    }
    return data;
  }

  public toArray(): T[] {
    const array: T[] = [];
    let current: ITwoWayLinkedListNode<T> = this._head;
    for (let index = 0; index < this.length; index += 1) {
      array.push(current.data);
      if (current.next == null) break;
      current = current.next;
    }
    return array;
  }

  public find(
    cb: (item: ITwoWayLinkedListNode<T>, index: number, container: TwoWayLinkedList<T>) => boolean,
  ): ITwoWayLinkedListNode<T> {
    let current: ITwoWayLinkedListNode<T> = this._head;
    for (let index = 0; index < this.length; index += 1) {
      if (cb(current, index, this)) return current;
      if (current.next == null) return null;
      current = current.next;
    }
    return null;
  }

  public addAfter(node: ITwoWayLinkedListNode<T>, data: T): this {
    if (node == null) throw new Error('Node is required!');
    const newNode = buildNode(data, node, node.next);
    newNode.prev.next = newNode;
    if (node === this._tail) this._tail = newNode;
    else newNode.next.prev = newNode;

    this._length += 1;
    return this;
  }

  public addBefore(node: ITwoWayLinkedListNode<T>, data: T): this {
    if (node == null) throw new Error('Node is required!');
    const newNode = buildNode(data, node.prev, node);
    if (node === this._head) this._head = newNode;
    else newNode.prev.next = newNode;
    newNode.next.prev = newNode;

    this._length += 1;
    return this;
  }
}
