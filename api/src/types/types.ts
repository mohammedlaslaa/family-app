/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import Service from "services/Service";

export type Action = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | never;

export type Route = {
  method: string;
  path: string;
  propertyKey: string;
  handler: () => {};
};

export type ServiceDefinition = {
  Service: new (...args: any[]) => Service;
  model: Model<any>;
  name: string;
};

export namespace Decorators {
  export namespace Controllers {
    type NonEmptyString<T extends string> = T extends "" ? never : T;

    type WithRestParam = {
      rest: string;
      hideRoutes?: string[];
    };

    type WithoutRestParam = {
      rest: "";
      hideRoutes?: string[];
    };

    export type Parameters = WithRestParam | WithoutRestParam;

    export type MyClassRef = new <T>(...args: any[]) => T;

    export type Controller = <S extends string>(arg: {
      rest: NonEmptyString<S>;
      hideRoutes?: string[];
    }) => <T extends { new (...args: any[]): {} }>(target: T) => T;
  }
}
