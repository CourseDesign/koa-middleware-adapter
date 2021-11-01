import { Middleware } from 'koa';
import callListener from '../listener/call-listener';
import defaultHandler from '../handler';
import errorHandler from "../handler/error-handler";

type CreateMiddlewareOptions = {
  handlers?: {
    extractParameterHandler: typeof defaultHandler.extractParameterHandler,
    injectResponseHandler: typeof defaultHandler.injectResponseHandler,
    errorHandler?: typeof errorHandler | true,
    [key: string]: unknown,
  };
  parameters?: object;
  response?: object;
  thisArg?: any;
  type?: any;
  status?: number;
};

export default function createMiddleware(listener: Function, options: CreateMiddlewareOptions = {}): Middleware {
  const localHandler = { ...defaultHandler, ...options.handlers || {} };

  return async (ctx, next) => {
    try {
      const extractedParameters = await localHandler.extractParameterHandler(
        ctx, options.parameters,
      );
      const result = await callListener(ctx, listener, options.thisArg, extractedParameters);
      await localHandler.injectResponseHandler(ctx, result, {
        response: options.response, status: options.status, type: options.type,
      });
    } catch (error) {
      /*
      errorHandler === true, use default handler
      errorHandler === Function, use given handler
      errorHandler === null, throw the error
     */

      if (typeof options?.handlers?.errorHandler === 'function') {
        await options.handlers.errorHandler(ctx, error);
      } else if (typeof options?.handlers?.errorHandler === 'boolean' && options.handlers.errorHandler) {
        await errorHandler(ctx, error);
      } else {
        throw error;
      }
    }

    await next();
  };
}
