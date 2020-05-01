/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import globalSettings from '@/common/utils/globalSettings';

export enum LogLevel {
  INFO = 0,
  WARN = 1,
  ERROR = 2,
  QUIET = 3,
}

const settings = globalSettings();

settings.LogLevel = LogLevel;

export default class Logger {
  public static get mode(): LogLevel {
    const value = Number(settings.currentLogLevel);
    if (Number.isNaN(value)) return LogLevel.INFO;
    return value;
  }
  public static set mode(value: LogLevel) {
    settings.currentLogLevel = value;
  }

  public static info(message?: any, ...optionalParams: any[]): void {
    if (this.mode <= LogLevel.INFO) console.info(message, ...optionalParams);
  }

  public static warn(message?: any, ...optionalParams: any[]): void {
    if (this.mode <= LogLevel.WARN) console.warn(message, ...optionalParams);
  }

  public static error(message?: any, ...optionalParams: any[]): void {
    if (this.mode <= LogLevel.ERROR) console.error(message, ...optionalParams);
  }

  private _context: Console = null;

  constructor() {
    if ((console as any).context != null) this._context = (console as any).context();
    else this._context = console;
  }

  public info(message?: any, ...optionalParams: any[]): void {
    if (Logger.mode <= LogLevel.INFO) this._context.info(message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    if (Logger.mode <= LogLevel.WARN) this._context.warn(message, ...optionalParams);
  }

  public error(message?: any, ...optionalParams: any[]): void {
    if (Logger.mode <= LogLevel.ERROR) this._context.error(message, ...optionalParams);
  }
}
