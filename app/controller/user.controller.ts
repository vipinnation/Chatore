import { NextFunction, Request, Response } from "express";
import Logger from "../../library/logger";
import { ServerResponse } from "../../library/server-response";
import { UserDao } from "../dao-layers/user.dao";
import User from '../model/user.model'


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        Logger.info(req.query);
        let user = await UserDao.getUsers(req.query);
        ServerResponse.server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await UserDao.saveUser(req.body);
        ServerResponse.server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        ServerResponse.bad_request(res, { msg: error });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        let user = await UserDao.updateUser(req.params.id, req.body);
        ServerResponse.server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        ServerResponse.bad_request(res, error);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        let user = await UserDao.removeUser(req.params.id);
        ServerResponse.server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        ServerResponse.bad_request(res, error);
    }
};

const searchUser = async (req: Request, res: Response) => {
    try {
        let { user }: any = req;
        Logger.info(req.query)
        let searchQuery = req.query.search
            ? {
                $or: [
                    {
                        firstName: { $regex: req.query.search, $options: "i" },
                    },
                    {
                        lastName: { $regex: req.query.search, $options: "i" },
                    },
                    {
                        email: { $regex: req.query.search, $options: "i" },
                    },
                ],
            }
            : {};

        let users = await User.find(searchQuery).find({
            _id: { $ne: user._id },
        });

        ServerResponse.server_ok(res, users);
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

export const UserController = { getUsers, addUser, update, deleteUser, searchUser };