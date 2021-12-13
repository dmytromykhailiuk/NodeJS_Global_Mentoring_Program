import { logger } from '../../config';

function Logger(extraInfo?: string) {
  return function (constructor: any, methodName: string) {
    const originMethod = constructor[methodName];
    constructor[methodName] = function (...args: any[]) {
      const t1 = Date.now();
      const res = originMethod(...args);
      const dif = Date.now() - t1;
      logger.info(
        `${
          extraInfo && `[${extraInfo}] `
        }method - ${methodName} was executed for ${dif}`
      );
      return res;
    };
  };
}

export { Logger };
