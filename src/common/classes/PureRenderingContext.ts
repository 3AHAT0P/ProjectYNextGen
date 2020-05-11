import loadImage from '../utils/loadImage';
import { IPoint } from './Point';

export type PureRenderingContextOptions = { imageSmoothingEnabled?: boolean };

const isHTMLCanvasElement = (canvas: OffscreenCanvas | HTMLCanvasElement): canvas is HTMLCanvasElement => {
  try {
    return canvas instanceof HTMLCanvasElement;
  } catch (error) {
    return false;
  }
};

const isOffscreenCanvas = (canvas: OffscreenCanvas | HTMLCanvasElement): canvas is OffscreenCanvas => {
  try {
    return canvas instanceof OffscreenCanvas;
  } catch (error) {
    return false;
  }
};

export default class PureRenderingContext {
  private _canvas: OffscreenCanvas | HTMLCanvasElement = null;
  private _ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D = null;
  private _imageSmoothingEnabled: boolean = false;

  public get width(): number { return this._canvas.width; }
  public get height(): number { return this._canvas.height; }

  protected _disableImageSmoothing(): void {
    this._imageSmoothingEnabled = false;
    this._applyImageSmoothing();
  }

  protected _applyImageSmoothing(): void {
    this._ctx.imageSmoothingEnabled = this._imageSmoothingEnabled;
  }

  public applyOptions(canvas: OffscreenCanvas | HTMLCanvasElement, options: PureRenderingContextOptions): this {
    this._canvas = canvas;
    if (isHTMLCanvasElement(this._canvas)) Reflect.set(this._canvas.style, 'image-rendering', 'pixelated');
    this._ctx = this._canvas.getContext('2d');

    if (options.imageSmoothingEnabled) this._imageSmoothingEnabled = options.imageSmoothingEnabled;

    return this;
  }

  public async init(): Promise<this> {
    return this;
  }

  public resize(width: number, height: number): void {
    if (Number.isSafeInteger(width)) this._canvas.width = width;
    if (Number.isSafeInteger(height)) this._canvas.height = height;
    this._applyImageSmoothing();
  }

  public drawImage(
    image: CanvasImageSource,
    sx: number, sy: number, sWidth: number, sHeight: number,
    dx: number, dy: number, dWidth: number, dHeight: number,
  ): void {
    this._ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  public drawImageFullFilled(image: CanvasImageSource): void {
    this.drawImage(image, 0, 0, Number(image.width), Number(image.height), 0, 0, this.width, this.height);
  }

  public fill(color: string = 'white'): void {
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, this.width, this.height);
    this._ctx.restore();
  }

  public async flip(type?: 'X' | 'Y', offset: IPoint = { x: 0, y: 0 }): Promise<void> {
    // @FIXME: That await generate blinks when image is fliping.
    // It could be through temporary canvas;
    const image = await createImageBitmap(this._canvas);
    this.clear();
    if (type === 'X') {
      this._ctx.scale(-1, 1);
      this._ctx.drawImage(image, -image.width - offset.x, 0);
    }
    if (type === 'Y') {
      this._ctx.scale(1, -1);
      this._ctx.drawImage(image, 0, -image.height - offset.y);
    }
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  public clear(): void {
    this._ctx.clearRect(0, 0, this.width, this.height);
    this._applyImageSmoothing();
  }

  public async fromURL(url: string, getImageSize: boolean = false): Promise<void> {
    const image = await loadImage(url);
    if (getImageSize) this.resize(image.width, image.height);
    this.drawImageFullFilled(image);
  }

  public toImageBitmap(): Promise<ImageBitmap> {
    return createImageBitmap(this._canvas);
  }

  public toBlob(type: string = 'image/jpeg', quality: number = 0.95): Promise<Blob> {
    if (isOffscreenCanvas(this._canvas)) return this._canvas.convertToBlob({ type, quality });
    if (isHTMLCanvasElement(this._canvas)) {
      const canvas = this._canvas;
      return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
      });
    }
    throw new Error('Canvas is wrong!');
  }

  public async toObjectURL(type: string = 'image/jpeg', quality: number = 0.95): Promise<string> {
    const blob = await this.toBlob(type, quality);
    return URL.createObjectURL(blob);
  }

  public async toDataURL(type: string = 'image/jpeg', quality: number = 0.95): Promise<string> {
    if (isHTMLCanvasElement(this._canvas)) return this._canvas.toDataURL(type, quality);
    if (isOffscreenCanvas(this._canvas)) {
      const blob = await this.toBlob(type, quality);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result.toString()));
        reader.readAsDataURL(blob);
      });
    }
    throw new Error('Canvas is wrong!');
  }
}
