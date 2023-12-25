import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from "morgan"
import path from "path"
import http from 'http'
import Logger from './library/logger';
import routes from './routes';
import redis from './redis/_init.redis';
import db from './db';
dotenv.config();


const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors<Request>({ origin: "*" }));
app.use(morgan('dev'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req: Request, res: Response) => {
    res.render("home");
});

app.use('/api/v1', routes);


const port = process.env.PORT || 5000;
export const server = http.createServer(app);

server.listen(port, () => {
    Logger.info(`⚡️ Server is running at http://localhost:${port}`);
});


process.on('SIGINT', async () => {
    server.close(async () => {
        await db.connection.close();
        await redis.quit();
        process.exit(0);
    });
});

process.on('SIGTERM', async () => {
    server.close(async () => {
        await db.connection.close();
        await redis.quit();
        process.exit(0);
    });

});
