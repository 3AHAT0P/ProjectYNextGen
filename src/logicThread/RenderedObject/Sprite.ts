import { loadImage } from '@/common/utils';

import { IRenderedObject } from './RenderedObject';

export interface ISpriteOptions {
  url?: string;
  image?: ImageBitmap;
}

export default class Sprite {
  private _needLoad: boolean = false;
  private _imageUrl: string = null;
  private _image: ImageBitmap = null;

  public get width(): number { return this._image == null ? 0 : this._image.width; }
  public get height(): number { return this._image == null ? 0 : this._image.height; }

  public applyOptions(options: ISpriteOptions): this {
    if (options.url != null) {
      this._imageUrl = options.url;
      this._needLoad = true;
    } else if (options.image != null) {
      this._image = options.image;
      this._needLoad = false;
    }

    return this;
  }

  public async init(): Promise<this> {
    if (this._needLoad) this._image = await loadImage(this._imageUrl);

    return this;
  }

  public toRenderedObject(): IRenderedObject {
    return {
      source: this._image,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    };
  }
}
