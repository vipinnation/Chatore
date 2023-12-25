import { Request, Response } from 'express'
import Logger from '../../library/logger';
import Message from '../model/message.model'
import Chat from '../model/chat.model'
import { ServerResponse } from '../../library/server-response';


const sendMessage = async (req: Request, res: Response) => {
    try {
        Logger.info("Send Message controller");

        const { content, chat_id } = req.body;

        if (!content && !chat_id) {
            ServerResponse.bad_request(res, { msg: "All field required" });
        } else if (!content) {
            ServerResponse.bad_request(res, { msg: "Message is required" });
        } else if (!chat_id) {
            ServerResponse.bad_request(res, { msg: "Chat Id is required" });
        } else {
            let { user }: any = req;
            let message = new Message({
                sender: user._id,
                content: content,
                chat: chat_id,
            });

            let savedMessage = await message.save();
            let chat = await Chat.findByIdAndUpdate(chat_id, { $push: { messages: savedMessage } })
            res.status(200).send(message);
        }
    } catch (error) {
        Logger.error(error);
        ServerResponse.server_error(res, error);
    }
};

export { sendMessage };