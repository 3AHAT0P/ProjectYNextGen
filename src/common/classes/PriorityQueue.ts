import TwoWayLinkedList from './TwoWayLinkedList';

interface DataWithPriotity<T> {
  data: T;
  priority: number;
}

export default class PriorityQueue<T> {
  private _data: TwoWayLinkedList<DataWithPriotity<T>> = new TwoWayLinkedList<DataWithPriotity<T>>();
  private _order: 'ASC' | 'DESC' = 'ASC';

  public get length(): number { return this._data.length; }

  constructor(order: 'ASC' | 'DESC' = 'ASC') {
    this._order = order;
  }

  public put(data: T, priority: number): this {
    const node = this._data.find((_node) => {
      if (this._order === 'ASC' && _node.data.priority > priority) return true;
      if (this._order === 'DESC' && _node.data.priority < priority) return true;
      return false;
    });
    if (node == null) this._data.addToEnd({ data, priority });
    else this._data.addBefore(node, { data, priority });
    return this;
  }

  public take(): T {
    const dataWithPriority = this._data.pullOutOfStart();
    if (dataWithPriority == null) return null;
    return dataWithPriority.data;
  }
}
