import mongoose, { Schema } from "mongoose";

interface IChat {
  name: string;
  isGroupChat: boolean;
  members: Array<string>;
  messages: any;
  admin: any;
}

const ChatSchema = new Schema<IChat>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    isGroupChat: { type: Boolean, default: false },
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
    admin: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('chat',ChatSchema)