import React, { useState, useEffect } from "react";
import ChatHeader from "./chat-header";
import ChatMessage from "./chat-message";
import TypeMessage from "./type-message";
import ChatAreaImage from '../../assets/images/chat_area.svg'
import Image from "next/image";

type ChattingAreaProps = { currentChat: IChat; userId: string };

interface IChat {
  admin?: any;
  members?: any;
  messages?: any;
  name: string;
  _id: any;
}
const ChattingArea: React.FunctionComponent<ChattingAreaProps> = ({
  currentChat,
  userId,
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    loadUsername();
  }, [currentChat]);

  const loadUsername = async () => {
    return new Promise((resolve, reject) => {
      if (Object.keys(currentChat).length) {
        currentChat.members.map((member: any) => {
          if (member._id != userId) {
            setUsername(`${member.firstName} ${member.lastName}`);
            resolve(true);
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col flex-auto h-full">
      {Object.keys(currentChat).length ? (
        <>
          <div className="shadow-xl py-2 px-6  border-1 fixed z-50 bg-primary text-white  w-full border-b-1">
            <ChatHeader name={username} />
          </div>
          <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 min-h-min p-4 mt-12"
            style={{ width: "79vw" }}
            id="messages"
          >
            {currentChat.messages?.map((message: any) => (
              <>
                <ChatMessage
                  sender={message.sender}
                  message={message.content}
                  username="dsf "
                />
              </>
            ))}
          </div>

          <TypeMessage chat_id={currentChat?._id} />
        </>
      ) : (
        <>
          <Image src={ChatAreaImage} />
        </>
      )}
    </div>
  );
};

export default ChattingArea;
