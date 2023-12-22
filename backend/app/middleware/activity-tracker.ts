import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import Logger from "../../library/logger";

const ActivityTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const activityDetails: any = {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: { body: req.body, query: req.query, params: req.params },
            statusCode: null,
            responseHeaders: null,
            responseBody: null,
        };

        const originalSend: Response['send'] = res.send;

        res.send = function (body: any): Response<any, Record<string, any>> {
            activityDetails.statusCode = res.statusCode;
            activityDetails.responseHeaders = res.getHeaders();
            activityDetails.responseBody = body;
            originalSend.call(res, body);

            void (async function () {
                // add your activity log here
            })();


            return res;
        };


        next();
    } catch (error) {
        next();
    }
}


export default ActivityTracker