import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

const useSchemaMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = schema.parse(req.body);
    
        req.body = validatedData;
    
        return next();

    } catch(err) {
        if (err instanceof ZodError) {
            return res.status(400).json(err.flatten().fieldErrors)
        }
    }
  };

export default useSchemaMiddleware;
