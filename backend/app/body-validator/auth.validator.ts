import Joi from "joi";

const signupValidator = Joi.object({
    full_name: Joi.string().required().min(3).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(255),
});

export { signupValidator, loginValidator }