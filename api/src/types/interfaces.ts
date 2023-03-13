/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose";
import { Action, Route } from "./types";

export interface IService {
  name: string;
  rest?: string;
  routes?: Route[];
  model: Model<any>;
  create: Action;
  get: Action | (() => void);
  list: Action;
  remove: Action;
}
