import express, { Request, Response } from 'express';
import { authRoutes } from './auth.routes';
import { chatRoutes } from './chat.routes';
import { messageRoutes } from './message.route';
import { userRoute } from './user.route';

const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
    try {
        res.send('Welcome to Chatore Api version 1.0 ');
    } catch (error) {
    }
});

routes.use("/auth", authRoutes)
routes.use("/chats", chatRoutes)
routes.use('/users', userRoute)
routes.use("/message", messageRoutes)


export = routes;
