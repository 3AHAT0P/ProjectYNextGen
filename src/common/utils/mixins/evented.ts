import EventEmitter, { IListener } from '@/common/classes/EventEmitter';

import { updateInheritanceSequance, checkInheritanceSequance, IWithInheritanceSequance } from '../classHelpers';

export interface IEvented {
  on(eventName: string, listener: IListener, ctx?: unknown): this;
  once(eventName: string, listener: IListener, ctx?: unknown): this;
  emit(eventName: string, ...data: unknown[]): this;
  emitAsync(eventName: string, ...data: unknown[]): Promise<this>;
}

type EventedConstructor = IWithInheritanceSequance & Constructor<IEvented>;

const _eventEmitter = Symbol('_eventEmitter');

const CLASS_NAME = Symbol.for('Evented');

export const isEvented = (Class: unknown): Class is EventedConstructor => checkInheritanceSequance(Class, CLASS_NAME);

/*
  @TODO Example
 */
const EventedMixin = <T extends Constructor<object>>(BaseClass: T): T & EventedConstructor => {
  if (isEvented(BaseClass)) return BaseClass;

  class Evented extends BaseClass implements IEvented {
    private [_eventEmitter] = new EventEmitter();

    public on(eventName: string, listener: IListener, ctx: unknown = null): this {
      this[_eventEmitter].on(eventName, listener, ctx);
      return this;
    }

    public once(eventName: string, listener: IListener, ctx: unknown = null): this {
      this[_eventEmitter].once(eventName, listener, ctx);
      return this;
    }

    public emit(eventName: string, ...data: unknown[]): this {
      this[_eventEmitter].emit(eventName, ...data);
      return this;
    }

    public async emitAsync(eventName: string, ...data: unknown[]): Promise<this> {
      await this[_eventEmitter].emitAsync(eventName, ...data);
      return this;
    }
  }

  updateInheritanceSequance(Evented as EventedConstructor, BaseClass as T & IWithInheritanceSequance, CLASS_NAME);

  return Evented;
};

export default EventedMixin;

export const Evented = EventedMixin(Object);
