import { Request, Response } from 'express'
import Logger from '../../library/logger';
import { ServerResponse } from '../../library/server-response';
import { MessageDAO } from '../dao-layers/message.dao';


const sendMessage = async (req: Request, res: Response) => {
    try {
        const { content, chat_id } = req.body;

        if (!content && !chat_id) {
            ServerResponse.bad_request(res, { msg: "All field required" });
        } else if (!content) {
            ServerResponse.bad_request(res, { msg: "Message is required" });
        } else if (!chat_id) {
            ServerResponse.bad_request(res, { msg: "Chat Id is required" });
        } else {
            let { user }: any = req;
            let message = MessageDAO.saveMessage({
                sender: user._id,
                content: content,
                chat: chat_id,
            });

            res.status(200).send(message);
        }
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

export const MessageController = { sendMessage };