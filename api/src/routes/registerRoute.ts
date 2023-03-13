import { Express } from "express";

import app from "app";

import logger from "utils/logger";
import { Methods } from "types/enums";

type T = {
  service: { new (): {} };
  propertyKey: string;
  method: Methods;
  route: string;
  handler: () => {};
};

export default async ({ service, propertyKey, method, route, handler }: T) => {
  try {
    if (service && propertyKey && Methods[method] && route) {
      app[Methods[method].toLowerCase() as keyof Express]?.(route, handler);

      logger.info({
        flat: true,
        method: method.toUpperCase(),
        route,
        gray: "=>",
        action: `${service.name.toLowerCase()}.${propertyKey}`,
      });
    }
  } catch (error) {
    //
  }
};
