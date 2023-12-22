import { NextFunction, Request, Response } from "express";

const BodyValidator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dataToValidate = req.body; // Assuming the data to validate is in the request body

        const validationResult = schema.validate(dataToValidate);

        if (validationResult.error) {
            // Validation failed
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        // Validation succeeded, proceed to the next middleware or route handler
        next();
    };
};


export default BodyValidator