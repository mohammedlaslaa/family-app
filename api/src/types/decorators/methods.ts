import { Methods } from "types/enums";
import { IService } from "types/interfaces";

export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
}

type TypedMethodDecorator = <T>(
  target: IService,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) => void;

function methodDecoratorFactory(method: Methods) {
  return function (path: string): TypedMethodDecorator {
    return function (target, propertyKey, descriptor) {
      Object.defineProperty(target, "routes", {
        value: [
          ...(target.routes?.length ? target.routes : []),
          {
            method,
            path,
            propertyKey,
            handler: descriptor.value,
          },
        ],
        writable: true,
        enumerable: true,
      });

      descriptor.enumerable = true;
    };
  };
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Patch = methodDecoratorFactory(Methods.PATCH);
export const Delete = methodDecoratorFactory(Methods.DELETE);
