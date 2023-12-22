import { Request, Response } from "express";
import { config } from "../../config/config";
import Logger from "../../library/logger";
import { decryptPassword } from "../../library/password.process";
import { ServerResponse } from "../../library/server-response";
import User from '../model/user.model'
import jwt from 'jsonwebtoken'
import { UserDao } from "../dao-layers/user.dao";

const signup = async (req: Request, res: Response) => {
    try {
        let user = await UserDao.saveUser(req.body);
        ServerResponse.server_ok(res, user);
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email: email }).select("+password");
        if (!user) return ServerResponse.bad_request(res, { msg: "Email or password is mismatch" });

        let status = await decryptPassword(password, user.password);
        if (status == false) return ServerResponse.bad_request(res, { msg: "Email or password is mismatch" });

        let token = await jwt.sign(
            { id: user._id, email: user.email },
            config.jwt.JWT_SECRET,
            { expiresIn: config.jwt.JWT_EXPIRE }
        );

        ServerResponse.server_ok(res, {
            msg: "User authenticated",
            token,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

const forgotPassword = async (req: Request, res: Response) => {
    try {
        ServerResponse.server_ok(res, { msg: "User authenticated" });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

export const AuthController = { signup, login, forgotPassword };