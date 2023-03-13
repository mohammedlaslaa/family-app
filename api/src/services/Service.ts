/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model } from "mongoose";
import { IService } from "types/interfaces";
import { Request, Response, NextFunction } from "express";
import logger from "utils/logger";

import { Get, Post, Delete, Put } from "types/decorators/methods";

export default class Service implements IService {
  name: string;
  rest?: string;
  model: Model<any>;
  logger = logger;
  routes!: {
    method: string;
    path: string;
    propertyKey: string;
    handler: () => {};
  }[];

  constructor(name: string, model: Model<any>) {
    this.name = name;
    this.model = model;
  }

  @Get("/")
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const entities: Document[] | null = await this.model.find();

      res.send(entities);
    } catch (error) {
      next(error);
    }
  }

  @Get("/:id")
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const entity: Document | null = await this.model.findById(req.params.id);

      res.send(entity);
    } catch (error) {
      next(error);
    }
  }

  @Post("/")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdEntity: Document | null = await this.model.create(
        req.params
      );

      if (!createdEntity) next(createdEntity);

      res.send(createdEntity);
    } catch (error) {
      next(error);
    }
  }

  @Put("/")
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;

      const updatedEntity: Document | null = await this.model.findByIdAndUpdate(
        params.id,
        params
      );

      if (!updatedEntity) next(updatedEntity);

      res.send(updatedEntity);
    } catch (error) {
      next(error);
    }
  }

  @Delete("/:id")
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const entity: Document | null = await this.model.findByIdAndRemove(
        req.params.id
      );

      res.send(entity);
    } catch (error) {
      next(error);
    }
  }
}
