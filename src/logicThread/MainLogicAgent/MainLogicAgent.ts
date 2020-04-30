import Renderer, { IRendererOptions } from '../Renderer/Renderer';
import EventController from '../EventController';
import EventLoop, { IEventLoopOptions } from '../EventLoop';

export default class MainLogicAgent {
  private _eventLoop = new EventLoop();
  private _eventController = new EventController();
  private _renderer = new Renderer();

  private _eventLoopOptions: IEventLoopOptions = {};
  private _rendererOptions: IRendererOptions = {};

  get eventController(): EventController { return this._eventController; }
  get eventLoop(): EventLoop { return this._eventLoop; }
  get renderer(): Renderer { return this._renderer; }

  public async init(): Promise<void> {
    await this._eventLoop.init(this._eventLoopOptions);
    await this._renderer.init(this._rendererOptions);

    this.eventController.on('TEST', () => console.log('its happened!'));
  }

  public setCanvas(canvas: OffscreenCanvas): void {
    this._rendererOptions.canvas = canvas;
  }

  public setFrameRate(frameRate: number): void {
    this._eventLoopOptions.frameRate = frameRate;
  }
}
