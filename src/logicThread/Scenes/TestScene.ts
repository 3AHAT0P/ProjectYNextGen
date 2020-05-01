import { loadImage } from '@/common/utils';
import Renderer from '../Renderer/Renderer';

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

export default class TestScene {
  private _index: number = 0;
  private _images: ImageBitmap[] = [];

  private _renderer: Renderer = null;

  private _tick(ctx: OffscreenCanvasRenderingContext2D, deltaTime: number): void {
    const image = this._images[this._index];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * 4, image.height * 4);
    this._index += 1;
    if (this._index >= this._images.length) this._index = 0;
    this._renderer.addZeroLayerTask({ cb: this._tick });
  }

  constructor({ renderer }: { renderer: Renderer }) {
    this._renderer = renderer;
    this._tick = this._tick.bind(this);
  }

  public async init(): Promise<void> {
    this._images = await Promise.all(IMAGE_URLS.map(loadImage));

    this._renderer.addZeroLayerTask({ cb: this._tick });
  }
}
