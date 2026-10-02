import z from "zod";
import express from "express";

interface Schema {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}

export const schemaValidator = (schema: Schema) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.params) {
        const validatedParams = (await schema.params.parseAsync(
          req.params,
        )) as any;
        Object.assign(req.params, validatedParams);
      }
      if (schema.query) {
        const validatedQuery = (await schema.query.parseAsync(
          req.query,
        )) as any;
        Object.assign(req.query, validatedQuery);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
