import express, { Request, Response } from 'express';
import { authRoutes } from './auth.routes';

const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
    try {
        res.send('Welcome to Chatore Api version 1.0 ');
    } catch (error) {
    }
});

routes.use("/auth", authRoutes)


export = routes;
