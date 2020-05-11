import PriorityQueue from '@/common/classes/PriorityQueue';
import Logger from '@/common/classes/Logger';
import PureRenderingContext from '@/common/classes/PureRenderingContext';
import EventLoop, { ITickEvent } from '../EventLoop';

export type RendererConstructor = Constructor<Renderer>;

export interface IRendererOptions {
  renderingContext?: PureRenderingContext;
}

export interface IRenderer {
  init: (options: IRendererOptions) => Promise<void>;
}

export interface IRenderingTask {
  cb: (ctx: PureRenderingContext, deltaTime: number) => void;
}

export enum RenderingQueueName {
  PREPARE = 0,
  BACKGROUND_LAYER = 1,
  ZERO_LAYER = 2,
  FOREGROUND_LAYER = 3,
}

export default class Renderer implements IRenderer {
  private _renderingContext: PureRenderingContext = null;

  private _eventLoop: EventLoop = null;
  private _renderingQueue: PriorityQueue<IRenderingTask> = new PriorityQueue();
  private _freezedRenderingQueue: PriorityQueue<IRenderingTask> = new PriorityQueue();

  private _loopIndex: number = 0;
  private _previousLoopIndex: number = -1;

  public get width(): number { return this._renderingContext.width; }
  public get height(): number { return this._renderingContext.height; }

  private _swapQueues(): void {
    const _freezedRenderingQueue = this._renderingQueue;
    this._renderingQueue = this._freezedRenderingQueue;
    this._freezedRenderingQueue = _freezedRenderingQueue;
  }

  private _runTasks({ currentTime, deltaTime }: ITickEvent): void {
    if (this._loopIndex === this._previousLoopIndex) {
      Logger.warn('Rendering loop so long!');
      return;
    }
    this._previousLoopIndex = this._loopIndex;
    this._swapQueues();
    let task = this._freezedRenderingQueue.take();
    while (task != null) {
      task.cb(this._renderingContext, deltaTime);
      task = this._freezedRenderingQueue.take();
    }
    this._loopIndex += 1;
  }

  constructor({ eventLoop }: { eventLoop: EventLoop }) {
    this._eventLoop = eventLoop;

    this._runTasks = this._runTasks.bind(this);
  }

  public applyOptions(options: IRendererOptions): this {
    this._renderingContext = options.renderingContext;

    return this;
  }

  public async init(): Promise<void> {
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
