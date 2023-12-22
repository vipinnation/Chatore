import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ServerResponse } from '../../library/server-response';
import Logger from '../../library/logger';

const ObjectIdValidator = async (req: Request, res: Response, next: NextFunction) => {
    let route
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        let path = req.baseUrl.split("/")
        let str = path[path.length - 1]
        route = str.charAt(0).toUpperCase() + str.slice(1);
        if (!isValidId) {
            return ServerResponse.not_found(res, { msg: `${route || 'item'} not found` })
        }
        next();
    } catch (error) {
        Logger.error(error);
        return ServerResponse.not_found(res, { msg: `${route || 'item'} not found` })
    }
};

export default ObjectIdValidator