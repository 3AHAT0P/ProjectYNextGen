export type RendererConstructor = Constructor<Renderer>;

export interface IRendererOptions {
  canvas?: OffscreenCanvas;
}

export interface IRenderer {
  init: (options: IRendererOptions) => Promise<void>;
}

export default class Renderer implements IRenderer {
  private _canvas: OffscreenCanvas = null;
  private _ctx: OffscreenCanvasRenderingContext2D = null;

  private _renderingQueue

  public get width(): number { return this._canvas.width; }
  public get height(): number { return this._canvas.height; }

  public async init(options: IRendererOptions): Promise<void> {
    this._canvas = options.canvas;
    this._ctx = this._canvas.getContext('2d');
    this._ctx.imageSmoothingEnabled = false;
  }
}
