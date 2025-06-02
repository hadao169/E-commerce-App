import { ZodError } from "zod";

/**
 * Validate request against Zod schema
 * @param {import("zod").AnyZodObject} schema
 */

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
};

export default validate;
