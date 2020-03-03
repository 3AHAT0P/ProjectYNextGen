import * as Comlink from 'comlink';

console.log('Hi from main');

interface IRenderer {
  init: (canvas: OffscreenCanvas) => Promise<void>;
  start: () => void;
  stop: () => void;
}

type IRendererConstructor = new () => IRenderer;

async function init() {
  const worker = new Worker('worker.js');
  const Renderer = Comlink.wrap<IRendererConstructor>(worker);
  const renderer = await new Renderer();
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
  document.body.appendChild(canvas);
  const offscreen = canvas.transferControlToOffscreen();
  // @ts-ignore
  await renderer.init(Comlink.transfer(offscreen, [offscreen]));
  await renderer.start();
}
init();