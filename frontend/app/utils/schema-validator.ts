import z from "zod";

export const schemaValidator = async (schema: z.ZodType, data: any) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return Promise.reject({
      kind: "VALIDATION",
      msg: "Invalid values",
      fieldErrors: result.error.issues.map((issue) => ({
        fieldName: issue.path.join("."),
        msg: issue.message,
        code: issue.code,
      })),
    });
  }

  return Promise.resolve(result);
};
