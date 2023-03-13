import User from "models/User";
import Controller from "types/decorators/Controller";
import { ServiceDefinition } from "types/types";
import Service from "./Service";

@Controller({ rest: "/users" })
class Users extends Service {}

const definition: ServiceDefinition = {
  Service: Users,
  model: User,
  name: "users",
};

export default definition;
