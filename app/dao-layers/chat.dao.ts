import Chat from "../model/chat.model";

const fetchChatById = (chatId: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let group = await Chat.findById(chatId)
                .populate("admin")
                .populate("members")
                .populate("message")
                .sort({ updatedAt: -1 });
            resolve(group);
        } catch (error) {
            reject(error);
        }
    });
};

export const ChatDAO = { fetchChatById };