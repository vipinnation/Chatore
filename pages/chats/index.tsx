import React from "react";
import AvatarComponent from "../../components/chats/avatar";
import ChattingArea from "../../components/chats/chatting-area";
import CreateChat from "../../components/chats/create-chat";

const Chats = () => {
  let activeChats = [
    {
      name: "Username 1",
    },
    {
      name: "Username 2",
    },
    {
      name: "Username 3",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
    {
      name: "Username 4",
    },
  ];
  return (
    <div className="chat-space bg-primary pt-12">
      <div className="flex h-screen antialiased text-gray-800 fixed">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col pl-6 pr-4 w-80 bg-primary flex-shrink-0">
            <div className="flex flex-col mt-2 fixed h-screen">
              <div className="flex flex-row items-center justify-around text-xs">
                <span className="font-semibold text-lg text-white mr-4">
                  Active Conversations
                </span>
                <CreateChat />
              </div>

              <div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
                {activeChats &&
                  activeChats.map((chat) => (
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                      <AvatarComponent name={chat.name} />
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <ChattingArea />
        </div>
      </div>
    </div>
  );
};

export default Chats;
