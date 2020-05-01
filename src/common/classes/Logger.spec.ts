/* eslint-disable no-console */
import {
  describe,
  beforeEach,
  expect,
  it,
  jest,
  afterAll,
} from '@jest/globals';

import Logger, { LogLevel } from './Logger';

const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

describe('Logger', () => {
  describe('static mode', () => {
    it('Should return LogLevel.INFO when not settled', () => {
      expect(Logger.mode).toBe(LogLevel.INFO);
    });
    it('Should return valid value when settled', () => {
      Logger.mode = LogLevel.ERROR;
      expect(Logger.mode).toBe(LogLevel.ERROR);
    });
  });

  describe('static info', () => {
    let mockedConsoleInfo = jest.fn();
    beforeEach(() => {
      mockedConsoleInfo = jest.fn(originalConsoleInfo);
      console.info = mockedConsoleInfo;
    });

    it('Should call console.info', () => {
      Logger.mode = LogLevel.INFO;
      Logger.info('INFO');
      expect(mockedConsoleInfo).toHaveBeenCalled();
      expect(mockedConsoleInfo).toHaveBeenCalledWith('INFO');
    });

    it('Shouldn\'t call console.info', () => {
      Logger.mode = LogLevel.WARN;
      Logger.info('INFO');
      expect(mockedConsoleInfo).not.toHaveBeenCalled();
    });
  });

  describe('static warn', () => {
    let mockedConsoleWarn = jest.fn();
    beforeEach(() => {
      mockedConsoleWarn = jest.fn(originalConsoleWarn);
      console.warn = mockedConsoleWarn;
    });

    it('Should call console.warn', () => {
      Logger.mode = LogLevel.WARN;
      Logger.warn('WARN');
      expect(mockedConsoleWarn).toHaveBeenCalled();
      expect(mockedConsoleWarn).toHaveBeenCalledWith('WARN');
    });

    it('Shouldn\'t call console.warn', () => {
      Logger.mode = LogLevel.ERROR;
      Logger.warn('WARN');
      expect(mockedConsoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('static error', () => {
    let mockedConsoleError = jest.fn();
    beforeEach(() => {
      mockedConsoleError = jest.fn(originalConsoleError);
      console.error = mockedConsoleError;
    });

    it('Should call console.error', () => {
      Logger.mode = LogLevel.ERROR;
      Logger.error('ERROR');
      expect(mockedConsoleError).toHaveBeenCalled();
      expect(mockedConsoleError).toHaveBeenCalledWith('ERROR');
    });

    it('Shouldn\'t call console.error', () => {
      Logger.mode = LogLevel.QUIET;
      Logger.error('ERROR');
      expect(mockedConsoleError).not.toHaveBeenCalled();
    });
  });

  describe('constructor', () => {
    it('Should create', () => {
      expect(new Logger()).not.toBeNull();
    });
    it('Should instance of Logger', () => {
      expect(new Logger()).toBeInstanceOf(Logger);
    });
  });

  describe('info', () => {
    let mockedConsoleInfo = jest.fn();
    let logger: Logger = null;

    beforeEach(() => {
      mockedConsoleInfo = jest.fn(originalConsoleInfo);
      console.info = mockedConsoleInfo;
      logger = new Logger();
    });

    it('Should call console.info', () => {
      Logger.mode = LogLevel.INFO;
      logger.info('INFO');
      expect(mockedConsoleInfo).toHaveBeenCalled();
      expect(mockedConsoleInfo).toHaveBeenCalledWith('INFO');
    });

    it('Shouldn\'t call console.info', () => {
      Logger.mode = LogLevel.WARN;
      logger.info('INFO');
      expect(mockedConsoleInfo).not.toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    let mockedConsoleWarn = jest.fn();
    let logger: Logger = null;

    beforeEach(() => {
      mockedConsoleWarn = jest.fn(originalConsoleWarn);
      console.warn = mockedConsoleWarn;
      logger = new Logger();
    });

    it('Should call console.warn', () => {
      Logger.mode = LogLevel.WARN;
      logger.warn('WARN');
      expect(mockedConsoleWarn).toHaveBeenCalled();
      expect(mockedConsoleWarn).toHaveBeenCalledWith('WARN');
    });

    it('Shouldn\'t call console.warn', () => {
      Logger.mode = LogLevel.ERROR;
      logger.warn('WARN');
      expect(mockedConsoleWarn).not.toHaveBeenCalled();
    });
  });

  describe('error', () => {
    let mockedConsoleError = jest.fn();
    let logger: Logger = null;

    beforeEach(() => {
      mockedConsoleError = jest.fn(originalConsoleError);
      console.error = mockedConsoleError;
      logger = new Logger();
    });

    it('Should call console.error', () => {
      Logger.mode = LogLevel.ERROR;
      logger.error('ERROR');
      expect(mockedConsoleError).toHaveBeenCalled();
      expect(mockedConsoleError).toHaveBeenCalledWith('ERROR');
    });

    it('Shouldn\'t call console.error', () => {
      Logger.mode = LogLevel.QUIET;
      logger.error('ERROR');
      expect(mockedConsoleError).not.toHaveBeenCalled();
    });
  });
});

afterAll(() => {
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});
