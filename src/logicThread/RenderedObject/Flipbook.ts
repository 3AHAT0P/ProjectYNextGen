import Sprite, { ISpriteOptions } from './Sprite';
import { IRenderedObject } from './RenderedObject';

export interface IPipelineItem {
  spriteIndex: number;
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
}

export default class Flipbook {
  private _sprites: Sprite[] = [];
  private _index: number = 0;

  private _pipeline: IPipelineItem[] = [];

  public applyOptions(spriteOptions: ISpriteOptions[], pipeline: IPipelineItem[]): this {
    this._sprites = spriteOptions.map((options: ISpriteOptions) => new Sprite().applyOptions(options));

    this._pipeline = Object.assign([], pipeline);

    return this;
  }

  public async init(): Promise<this> {
    await Promise.all(this._sprites.map((sprite) => sprite.init()));

    return this;
  }

  public getCurrentRenderedObject(): IRenderedObject {
    const pipelineItem = this._pipeline[this._index];
    const spriteRenderedObject = this._sprites[pipelineItem.spriteIndex].toRenderedObject();
    return {
      source: spriteRenderedObject.source,
      x: pipelineItem.offsetX == null ? spriteRenderedObject.x : pipelineItem.offsetX,
      y: pipelineItem.offsetY == null ? spriteRenderedObject.y : pipelineItem.offsetY,
      width: pipelineItem.width == null ? spriteRenderedObject.width : pipelineItem.width,
      height: pipelineItem.height == null ? spriteRenderedObject.height : pipelineItem.height,
    };
  }

  public render(): IRenderedObject {
    const renderObject = this.getCurrentRenderedObject();
    this._index += 1;
    if (this._index >= this._sprites.length) this._index = 0;

    return renderObject;
  }
}
