import * as Comlink from 'comlink';

import globalSettings from '@/common/utils/globalSettings';
import Logger, { LogLevel } from '@/common/classes/Logger';
import type MainLogicAgent from '@/logicThread/index';

const createCanvas = (to: HTMLElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
  to.appendChild(canvas);
  const offscreenCanvas = canvas.transferControlToOffscreen();
  return { canvas, offscreenCanvas };
};

const createButton = (to: HTMLElement, label: string, onClick: (event: MouseEvent) => void) => {
  const button = document.createElement('button');
  button.innerText = label;
  to.appendChild(button);
  button.addEventListener('click', onClick);
  return { button };
};

const initLogLevel = (level: LogLevel, onChange: (level: LogLevel) => void) => {
  const settings = globalSettings();
  Reflect.defineProperty(settings, 'currentLogLevel', {
    get(): LogLevel {
      return settings._currentLogLevel;
    },
    set(value: LogLevel) {
      settings._currentLogLevel = value;
      onChange(value);
    },
  });
  const updateLogLevel = (newLevel: LogLevel) => { settings.currentLogLevel = newLevel; };
  updateLogLevel(level);
  return updateLogLevel;
};

async function init(): Promise<void> {
  const worker = new Worker('logicThread.js');
  const MainLogicAgentConstructor = Comlink.wrap<Constructor<MainLogicAgent>>(worker);
  const mainLogicAgent = await new MainLogicAgentConstructor();
  const { offscreenCanvas } = createCanvas(document.body);
  createButton(document.body, 'PLAY', () => mainLogicAgent.eventController.emit('play'));
  createButton(document.body, 'PAUSE', () => mainLogicAgent.eventController.emit('pause'));
  await mainLogicAgent.setCanvas(Comlink.transfer(offscreenCanvas, [offscreenCanvas]));
  await mainLogicAgent.setFramesPerSecond(10);

  initLogLevel(LogLevel.INFO, (level: LogLevel) => mainLogicAgent.updateLogLevel(level));

  await mainLogicAgent.init();
}
init();
