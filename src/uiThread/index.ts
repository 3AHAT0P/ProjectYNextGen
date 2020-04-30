import * as Comlink from 'comlink';

import type MainLogicAgent from '@/logicThread/index';

async function init(): Promise<void> {
  const worker = new Worker('logicThread.js');
  const MainLogicAgentConstructor = Comlink.wrap<Constructor<MainLogicAgent>>(worker);
  const mainLogicAgent = await new MainLogicAgentConstructor();
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth - 5;
  canvas.height = window.innerHeight - 5;
  document.body.appendChild(canvas);
  const offscreen = canvas.transferControlToOffscreen();
  await mainLogicAgent.setCanvas(Comlink.transfer(offscreen, [offscreen]));
  await mainLogicAgent.setFrameRate(20);
  await mainLogicAgent.init();

  await mainLogicAgent.eventController.emit('TEST');

  // await renderer.start();
}
init();
