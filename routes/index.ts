import express, { Request, Response } from 'express';
import { authRoutes } from './auth.routes';
import { chatRoutes } from './chat.routes';

const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
    try {
        res.send('Welcome to Chatore Api version 1.0 ');
    } catch (error) {
    }
});

routes.use("/auth", authRoutes)
routes.use("/chats", chatRoutes)


export = routes;
