import { ServiceDefinition } from "types/types";
import Users from "./users.service";

const services: ServiceDefinition[] = [Users];

export const runServices = () => {
  for (const { Service, model, name } of services) {
    new Service(name, model);
  }
};
