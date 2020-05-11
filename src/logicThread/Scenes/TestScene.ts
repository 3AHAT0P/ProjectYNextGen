import PureRenderingContext from '@/common/classes/PureRenderingContext';
import Renderer from '../Renderer/Renderer';
import { ISpriteOptions } from '../RenderedObject/Sprite';
import { IRenderedObject } from '../RenderedObject/RenderedObject';
import Flipbook, { IPipelineItem } from '../RenderedObject/Flipbook';

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
  private _flipbook: Flipbook = new Flipbook();

  private _renderer: Renderer = null;

  private _tick(ctx: PureRenderingContext, deltaTime: number): void {
    const renderObject: IRenderedObject = this._flipbook.render();
    ctx.clear();
    ctx.drawImage(
      renderObject.source,
      renderObject.x, renderObject.y, renderObject.width, renderObject.height,
      0, 0, 256, 256,
    );
    this._renderer.addZeroLayerTask({ cb: this._tick });
  }

  constructor({ renderer }: { renderer: Renderer }) {
    this._renderer = renderer;
    this._tick = this._tick.bind(this);
  }

  public async init(): Promise<void> {
    const spriteOptions: ISpriteOptions[] = [];
    const pipeline: IPipelineItem[] = [];

    IMAGE_URLS.forEach((url: string, index: number) => {
      spriteOptions.push({ url });
      pipeline.push({ spriteIndex: index });
    });

    await this._flipbook.applyOptions(spriteOptions, pipeline).init();

    this._renderer.addZeroLayerTask({ cb: this._tick });
  }
}
