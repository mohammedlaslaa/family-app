/* eslint-disable @typescript-eslint/no-explicit-any */

import registerRoute from "routes/registerRoute";

import { Decorators } from "types/types";

const Controller: Decorators.Controllers.Controller =
  ({ rest, hideRoutes = [] }: Decorators.Controllers.Parameters) =>
  <T extends { new (...args: any[]): {} }>(target: T): T => {
    return class extends target {
      rest = rest;

      constructor(...args: any[]) {
        super(...args);

        for (const key in target.prototype) {
          if (key === "routes" && target.prototype[key]) {
            for (const route of target.prototype[key]) {
              if (!hideRoutes.includes(route.propertyKey))
                registerRoute({
                  service: target,
                  route: `${rest}${route.path === "/" ? "" : route.path}`,
                  method: route.method,
                  propertyKey: route.propertyKey,
                  handler: route.handler.bind(this),
                });
            }
          }
        }
      }
    };
  };

export default Controller;
