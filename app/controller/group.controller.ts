import { Request, Response } from "express";
import Chat from '.././model/chat.model'
import { ServerResponse } from "../../library/server-response";
import Logger from "../../library/logger";

const createGroup = async (req: Request, res: Response) => {
    try {
        let { name, members } = req.body;

        if (!name) return ServerResponse.bad_request(res, { msg: "Group name is required" });
        let { user }: any = req;
        let chat = await new Chat({
            name,
            members,
            isGroupChat: true,
            admin: user._id,
        });

        let createGroup = await chat.save();
        let group = 'await fetchChatById(createGroup._id)';
        ServerResponse.server_ok(res, { msg: "Group created successfully", group });
    } catch (error: any) {
        Logger.error(error);
        if (error.code == "11000") {
            ServerResponse.bad_request(res, { msg: "Group is already present with this name" });
        } else {
            ServerResponse.server_error(res, error);
        }
    }
};

const renameGroup = async (req: Request, res: Response) => {
    try {
        let { name } = req.body;
        if (!name) return ServerResponse.bad_request(res, { msg: "Name is required" });

        await Chat.findByIdAndUpdate(req.params.id, { name });
        let group = "await fetchChatById(req.params.id)";
        ServerResponse.server_ok(res, { msg: "Group name updated successully", group });
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};
const removeMember = async (req: Request, res: Response) => { };
const addMember = async (req: Request, res: Response) => { };
const deleteGroup = async (req: Request, res: Response) => { };

export const GroupChatController = { createGroup, renameGroup, removeMember, addMember, deleteGroup };