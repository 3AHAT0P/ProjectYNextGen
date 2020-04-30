import { Evented } from '@/common/utils/mixins/evented';

export interface IEventLoopOptions {
  frameRate?: number;
}

const BASE_FRAME_RATE = 60;

export default class EventLoop extends Evented {
  private _frameRate: number = BASE_FRAME_RATE;
  private _currentFrameIndex: number = 0;
  private _timerId: number = null;
  private _startTime: number = null;
  private _lastRenderTime: number = null;

  private _tick(): void {
    if (this._currentFrameIndex >= this._frameRate) {
      const currentTime = Date.now() - this._startTime;
      this.emit('tick', { currentTime, deltaTime: currentTime - this._lastRenderTime });
      this._lastRenderTime = currentTime;
      this._currentFrameIndex = 0;
    } else this._currentFrameIndex += 1;
    this._timerId = requestAnimationFrame(this._tick);
  }

  constructor() {
    super();
    this._tick = this._tick.bind(this);
  }

  public async init(options: IEventLoopOptions): Promise<void> {
    if (options.frameRate != null) this._frameRate = options.frameRate;
  }

  public start(): void {
    this._timerId = requestAnimationFrame(this._tick);
    this._startTime = Date.now();
    this._lastRenderTime = 0;
  }

  public stop(): void {
    cancelAnimationFrame(this._timerId);
    this._startTime = null;
    this._lastRenderTime = null;
  }
}
