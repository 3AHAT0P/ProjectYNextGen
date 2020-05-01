import Logger, { LogLevel } from '@/common/classes/Logger';
import Renderer, { IRendererOptions } from '../Renderer/Renderer';
import EventController from '../EventController';
import EventLoop, { IEventLoopOptions } from '../EventLoop';
import TestScene from '../Scenes/TestScene';

export default class MainLogicAgent {
  private _eventLoop = new EventLoop();
  private _eventController = new EventController();
  private _renderer = new Renderer(this);

  private _scene = new TestScene(this);

  private _eventLoopOptions: IEventLoopOptions = {};
  private _rendererOptions: IRendererOptions = {};

  get eventController(): EventController { return this._eventController; }
  get eventLoop(): EventLoop { return this._eventLoop; }
  get renderer(): Renderer { return this._renderer; }

  constructor() {
    this.run = this.run.bind(this);
    this.pause = this.pause.bind(this);

    Logger.mode = LogLevel.QUIET;
  }

  public async init(): Promise<void> {
    await this._eventLoop.init(this._eventLoopOptions);
    await this._renderer.init(this._rendererOptions);
    await this._scene.init();

    this.eventController.on('play', this.run);
    this.eventController.on('pause', this.pause);
  }

  public setCanvas(canvas: OffscreenCanvas): void {
    this._rendererOptions.canvas = canvas;
  }

  public setFramesPerSecond(framesPerSecond: number): void {
    this._eventLoopOptions.framesPerSecond = framesPerSecond;
  }

  // eslint-disable-next-line class-methods-use-this
  public updateLogLevel(value: LogLevel): void {
    Logger.mode = value;
  }

  public run(): void {
    Logger.info('It\'s started');
    this._eventLoop.start();
  }

  public pause(): void {
    Logger.info('It\'s on pause');
    this._eventLoop.stop();
  }
}
