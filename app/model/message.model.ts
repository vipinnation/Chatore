import mongoose, { Schema } from "mongoose";

interface IMessage {
    sender: any;
    time: any;
    content: string;
    chat: any;
    isEdited: boolean;
}

const MessageSchema = new Schema<IMessage>(
    {
        sender: { type: Schema.Types.ObjectId, ref: "user" },
        time: { type: Date, default: new Date().toISOString() },
        content: { type: String },
        chat: { type: Schema.Types.ObjectId, ref: "chat" },
        isEdited: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("message", MessageSchema);