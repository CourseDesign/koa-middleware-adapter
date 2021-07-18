import { Middleware } from 'koa';
import callListener from '../listener/call-listener';
import defaultHandler from '../handler';

type CreateMiddlewareOptions = {
  handlers?: object;
  parameters?: object;
  response?: object;
  thisArg?: any;
  type?: any;
  status?: number;
};

export default function createMiddleware(listener: Function, options: CreateMiddlewareOptions = {}): Middleware {
  const localHandler = { ...defaultHandler, ...options.handlers || {} };

  return async (ctx, next) => {
    let success = false;
    try {
      const extractedParameters = await localHandler.extractParameterHandler(
        ctx, options.parameters,
      );
      const result = await callListener(ctx, listener, options.thisArg, extractedParameters);
      await localHandler.injectResponseHandler(ctx, result, {
        response: options.response, status: options.status, type: options.type,
      });
      success = true;
    } catch (error) {
      await localHandler.errorHandler(ctx, error);
    }

    if (success) await next();
  };
}
