import Message from '../model/message.model'
import Chat from '../model/chat.model'


const saveMessage = (message_body: { sender: string, content: string, chat: string }) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            let message = new Message(message_body);

            let savedMessage = await message.save();
            let chat = await Chat.findByIdAndUpdate(message.chat, { $push: { messages: savedMessage } })
            resolve(savedMessage)
        } catch (error) {
            console.log(error)
            reject("Error occured while saving message")
        }
    })
}

export const MessageDAO = { saveMessage }