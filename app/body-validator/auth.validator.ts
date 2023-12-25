import Joi from "joi";

const signupValidator = Joi.object({
    full_name: Joi.string()
        .min(3).max(255).required()
        .messages({
            'string.base': 'Full name must be a string',
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least {#limit} characters',
            'string.max': 'Full name cannot exceed {#limit} characters',
            'any.required': 'Full name is required',
        }),

    email: Joi.string()
        .email().required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .min(6).max(255).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters',
            'string.max': 'Password cannot exceed {#limit} characters',
            'any.required': 'Password is required',
        }),
});


const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
});

export { signupValidator, loginValidator }