import { NextFunction, Request, Response } from "express";

const BodyValidator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dataToValidate = req.body; // Assuming the data to validate is in the request body

        const validationResult = schema.validate(dataToValidate);

        if (validationResult.error) {
            // Check if all required fields are missing
            const allFieldsRequiredError = validationResult.error.details.find((detail: any) => detail.type === 'object.missing');

            if (allFieldsRequiredError) {
                return res.status(400).json({ msg: 'All fields required' });
            }

            // Handle other validation errors
            return res.status(400).json({ msg: validationResult.error.details[0].message });
        }

        // Validation succeeded, proceed to the next middleware or route handler
        next();
    };
};


export default BodyValidator