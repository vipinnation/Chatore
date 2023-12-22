"use client";
import ChattingArea from "@/components/chats/chatting-area.component";
import CreateChat from "@/components/chats/create-chats.component";
import React from "react";

type Props = {};

const ChatsPage = (props: Props) => {
  return (
    <div className="chat-space bg-primary pt-[4.65rem]">
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

              {/* <div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
                {activeChats &&
                  activeChats.map((chat: any) => {
                    return chat?.isGroupChat == false ? (
                      <>
                        {chat.members.map((member: any) => (
                          <>
                            {member._id != userId && (
                              <span
                                className="px-2 rounded-xl py-1 cursor-pointer hover:bg-gray-500"
                                onClick={(e) => {
                                  openCurrentChat(chat);
                                }}
                              >
                                <AvatarComponent
                                  name={`${member.firstName}  ${member.lastName}`}
                                />
                              </span>
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <button
                        className="flex flex-row items-center hover:bg-gray-500 rounded-xl px-2 py-1"
                        key={chat.name}
                      >
                        <AvatarComponent name={chat.name} />
                      </button>
                    );
                  })}
              </div> */}
            </div>
          </div>
          <ChattingArea />
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
