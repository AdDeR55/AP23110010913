import { Log as MiddlewareLog } from '../../../logging_middleware/index.js';

export const Log = MiddlewareLog;

export const useLogger = () => {
  return { Log };
};
