import { Evented } from '@/common/utils/mixins/evented';

export interface ITickEvent {
  currentTime: number;
  deltaTime: number;
}

export interface IEventLoopOptions {
  framesPerSecond?: number;
}

const BASE_FRAME_RATE = 60;

export default class EventLoop extends Evented {
  private _frameRate: number = 0;
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
    if (options.framesPerSecond != null) {
      if (options.framesPerSecond < 1) throw new Error('framesPerSecond should be greater than 0!');
      const frameRate = BASE_FRAME_RATE / options.framesPerSecond;
      this._frameRate = frameRate < 1 ? 0 : frameRate - 1;
    }
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
