import { loadImage } from '@/common/utils';

const IMAGE_URLS = [
  '/images/idle1.png',
  '/images/idle2.png',
  '/images/idle3.png',
  '/images/idle4.png',
  '/images/idle5.png',
  '/images/idle6.png',
  '/images/idle7.png',
  '/images/idle8.png',
  '/images/idle9.png',
  '/images/idle10.png',
  '/images/idle11.png',
  '/images/idle12.png',
  '/images/idle13.png',
  '/images/idle14.png',
];

export type RendererConstructor = Constructor<Renderer>;

export interface IRenderer {
  init: (canvas: OffscreenCanvas) => Promise<void>;
  start: () => void;
  stop: () => void;
}

const FRAME_RATE = 60;

export default class Renderer implements IRenderer {
  private _canvas: OffscreenCanvas = null;
  private _ctx: OffscreenCanvasRenderingContext2D = null;
  private _frameRequestId: number = null;

  private _currentFrameIndex = 0;

  private _index = 0;
  private _images: ImageBitmap[] = [];

  public get width(): number { return this._canvas.width; }
  public get height(): number { return this._canvas.height; }

  private _tick(): void {
    if (this._currentFrameIndex >= FRAME_RATE / 6) {
      const image = this._images[this._index];
      this._ctx.clearRect(0, 0, this.width, this.height);
      this._ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * 4, image.height * 4);
      this._index += 1;
      if (this._index >= this._images.length) this._index = 0;
      this._currentFrameIndex = 0;
    } else {
      this._currentFrameIndex += 1;
    }
    this._frameRequestId = requestAnimationFrame(this._tick);
  }

  constructor() {
    this._tick = this._tick.bind(this);
  }

  public async init(canvas: OffscreenCanvas): Promise<void> {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('2d');
    this._ctx.imageSmoothingEnabled = false;

    this._images = await Promise.all(IMAGE_URLS.map(loadImage));
  }

  public start(): void {
    this._frameRequestId = requestAnimationFrame(this._tick);
  }

  public stop(): void {
    cancelAnimationFrame(this._frameRequestId);
  }
}
