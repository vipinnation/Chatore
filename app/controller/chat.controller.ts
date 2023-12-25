import { Request, Response } from "express";
import Chat from '../model/chat.model'
import User from '../model/user.model'
import { ServerResponse } from "../../library/server-response";
import Logger from "../../library/logger";

// Get All Group and Personal Chat
const fetchChats = async (req: Request, res: Response) => {
    try {
        let { user }: any = req;
        let chat = await Chat.find({
            $or: [
                { members: { $elemMatch: { $eq: user._id } } },
                { admin: { $elemMatch: { $eq: user._id } } },
            ],
        })
            .populate("members")
            .populate("admin")
            .populate("messages")
            .sort({ updatedAt: -1 });

        ServerResponse.server_ok(res, { chat: chat });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

const fetchPersonalChats = async (req: Request, res: Response) => {
    try {
        let { user_id } = req.body;
        if (!user_id) return ServerResponse.bad_request(res, { msg: "Please enter user" });
        let { user }: any = req;

        let searchUser = await User.findById(user_id);
        if (!searchUser) return ServerResponse.bad_request(res, { msg: "User not found " });

        let chat = await Chat.find({
            isGroupChat: false,
            $and: [
                { members: { $elemMatch: { $eq: user._id } } },
                { members: { $elemMatch: { $eq: user_id } } },
            ],
        })
            .populate("members")
            .populate("message")
            .sort({ updatedAt: -1 });

        if (chat.length > 0) return ServerResponse.server_ok(res, { chat });

        const createChat = await new Chat({
            name: `${user._id}----${user_id}`,
            isGroupChat: false,
            members: [user._id, user_id],
        });
        let createdChat = await createChat.save();
        let updatedChat = await Chat.find({ _id: createdChat })
            .populate("members")
            .populate("message")
            .sort({ updatedAt: -1 });
        ServerResponse.server_ok(res, { chat: updatedChat });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};


export const ChatController = { fetchChats, fetchPersonalChats }