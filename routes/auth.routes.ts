import express, { Request, Response } from 'express';
import { loginValidator, signupValidator } from '../app/body-validator/auth.validator';
import BodyValidator from '../app/body-validator/validator';
import { AuthController } from '../app/controller/auth.controller';

const routes = express.Router();


routes.post("/signup", BodyValidator(signupValidator), AuthController.signup)
routes.post("/login", BodyValidator(loginValidator), AuthController.login)
routes.post("/forgot-password", AuthController.forgotPassword)

export const authRoutes = routes;