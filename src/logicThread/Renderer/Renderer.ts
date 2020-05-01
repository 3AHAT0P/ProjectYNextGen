import PriorityQueue from '@/common/classes/PriorityQueue';
import EventLoop, { ITickEvent } from '../EventLoop';

export type RendererConstructor = Constructor<Renderer>;

export interface IRendererOptions {
  canvas?: OffscreenCanvas;
}

export interface IRenderer {
  init: (options: IRendererOptions) => Promise<void>;
}

export interface IRenderingTask {
  cb: (ctx: OffscreenCanvasRenderingContext2D, deltaTime: number) => void;
}

export enum RenderingQueueName {
  PREPARE = 0,
  BACKGROUND_LAYER = 1,
  ZERO_LAYER = 2,
  FOREGROUND_LAYER = 3,
}

export default class Renderer implements IRenderer {
  private _canvas: OffscreenCanvas = null;
  private _ctx: OffscreenCanvasRenderingContext2D = null;

  private _eventLoop: EventLoop = null;
  private _renderingQueue: PriorityQueue<IRenderingTask> = new PriorityQueue();
  private _freezedRenderingQueue: PriorityQueue<IRenderingTask> = new PriorityQueue();

  private _loopIndex: number = 0;
  private _previousLoopIndex: number = -1;

  public get width(): number { return this._canvas.width; }
  public get height(): number { return this._canvas.height; }

  private _swapQueues(): void {
    const _freezedRenderingQueue = this._renderingQueue;
    this._renderingQueue = this._freezedRenderingQueue;
    this._freezedRenderingQueue = _freezedRenderingQueue;
  }

  private _runTasks({ currentTime, deltaTime }: ITickEvent): void {
    if (this._loopIndex === this._previousLoopIndex) {
      console.warn('Rendering loop so long!');
      return;
    }
    this._previousLoopIndex = this._loopIndex;
    this._swapQueues();
    let task = this._freezedRenderingQueue.take();
    while (task != null) {
      task.cb(this._ctx, deltaTime);
      task = this._freezedRenderingQueue.take();
    }
    this._loopIndex += 1;
  }

  constructor({ eventLoop }: { eventLoop: EventLoop }) {
    this._eventLoop = eventLoop;

    this._runTasks = this._runTasks.bind(this);
  }

  public async init(options: IRendererOptions): Promise<void> {
    this._canvas = options.canvas;
    this._ctx = this._canvas.getContext('2d');
    this._ctx.imageSmoothingEnabled = false;

    this._eventLoop.on('tick', this._runTasks);
  }

  public addPrepareTask(task: IRenderingTask): void {
    this._renderingQueue.put(task, RenderingQueueName.PREPARE);
  }

  public addBackgroundLayerTask(task: IRenderingTask): void {
    this._renderingQueue.put(task, RenderingQueueName.BACKGROUND_LAYER);
  }

  public addZeroLayerTask(task: IRenderingTask): void {
    this._renderingQueue.put(task, RenderingQueueName.ZERO_LAYER);
  }

  public addForegroundLayerTask(task: IRenderingTask): void {
    this._renderingQueue.put(task, RenderingQueueName.FOREGROUND_LAYER);
  }
}
