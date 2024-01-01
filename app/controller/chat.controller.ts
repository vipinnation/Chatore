import { Request, Response } from "express";
import Chat from '../model/chat.model'
import User from '../model/user.model'
import { ServerResponse } from "../../library/server-response";
import Logger from "../../library/logger";
import mongoose from "mongoose";

// Get All Group and Personal Chat
const fetchChats = async (req: Request, res: Response): Promise<void> => {
    try {
        let { user }: any = req;

        const chat = await Chat.aggregate([
            {
                $match: {
                    $or: [
                        { "members": new mongoose.Types.ObjectId(user._id) },
                        { "admin": new mongoose.Types.ObjectId(user._id) },
                    ],
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "admin",
                    foreignField: "_id",
                    as: "admin"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "messages",
                    foreignField: "_id",
                    as: "messages"
                }
            },
            {
                $unwind: {
                    path: "$messages",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $sort: { "messages.createdAt": 1 },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" }, // Include the name field
                    isGroupChat: { $first: "$isGroupChat" }, // Include the isGroupChat field
                    members: { $addToSet: "$members" },
                    admin: { $addToSet: "$admin" },
                    messages: { $push: "$messages" },
                    updatedAt: { $first: "$updatedAt" },
                },
            },
            {
                $unwind: {
                    path: "$members",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: "$admin",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    isGroupChat: 1,
                    members: 1,
                    admin: 1,
                    messages: 1,
                    updatedAt: 1,
                },
            },
            {
                $sort: { updatedAt: -1 },
            },

        ])

        ServerResponse.server_ok(res, { chat });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, "Internal Server Error");
    }
};


const fetchPersonalChats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return ServerResponse.bad_request(res, { msg: "Please enter user" });
        }

        const { user }: any = req;

        const searchUser = await User.findById(user_id);

        if (!searchUser) {
            return ServerResponse.bad_request(res, { msg: "User not found" });
        }

        const chat = await Chat.aggregate([
            {
                $match: {
                    isGroupChat: false,
                    members: {
                        $all: [new mongoose.Types.ObjectId(user._id), new mongoose.Types.ObjectId(user_id)],
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members",
                },
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "message",
                    foreignField: "_id",
                    as: "messages",
                },
            },
            {
                $sort: { updatedAt: -1 },
            },
        ]);

        if (chat.length > 0) {
            return ServerResponse.server_ok(res, { chat: chat[0] });
        }

        const createChat = await new Chat({
            name: `${user._id}----${user_id}`,
            isGroupChat: false,
            members: [user._id, user_id],
        });

        const createdChat = await createChat.save();

        const updatedChat = await Chat.aggregate([
            {
                $match: {
                    _id: createdChat._id,
                },
            },
            {
                $lookup: {
                    from: "users", // Replace with the actual name of the users collection
                    localField: "members",
                    foreignField: "_id",
                    as: "members",
                },
            },
            {
                $lookup: {
                    from: "messages", // Replace with the actual name of the messages collection
                    localField: "message",
                    foreignField: "_id",
                    as: "messages",
                },
            },
            {
                $sort: { updatedAt: -1 },
            },
        ]);

        ServerResponse.server_ok(res, { chat: updatedChat[0] });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};



export const ChatController = { fetchChats, fetchPersonalChats }