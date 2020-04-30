import TwoWayLinkedList from './TwoWayLinkedList';

export default class Queue<T> {
  private _data: TwoWayLinkedList<T> = new TwoWayLinkedList<T>();

  public get length(): number { return this._data.length; }

  public put(data: T): this {
    this._data.addToEnd(data);
    return this;
  }

  public take(): T {
    return this._data.pullOutOfStart();
  }
}
