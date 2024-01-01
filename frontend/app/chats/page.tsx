'use client';
import ChattingArea from '@/components/chats/chatting-area.component';
import CreateChat from '@/components/chats/create-chats.component';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ChatAPI } from '@/services/api-calls/chats.api-calls';
import AvatarComponent from '@/components/chats/avatar.component';
import { CookieProvider } from '@/utils/cookies.util';
import SocketManager from '@/services/api-calls/socket.service';

const ChatsPage = () => {
  const socketManager = new SocketManager();
  const [chats, setChats] = useState<Array<any>>([]);
  const [isActiveConversation, setIsActiveConversation] = useState(true);
  const [currentSelectedChat, setCurrentSelectedChat] = useState({});
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  const displayActiveConversation = (data: boolean) => {
    try {
      setIsActiveConversation((_prev) => data);
    } catch (error) {}
  };

  useEffect(() => {
    loadActiveConversation();
  }, []);

  const loadActiveConversation = async () => {
    try {
      ('use server');
      let data = await ChatAPI.getActiveConversations();
      setChats((_prev) => data);
      let userId = await CookieProvider.getCookie('_id');
      setLoggedInUser((_prev) => userId as any);
    } catch (error) {}
  };

  const loadNewChat = (chat: any, isNew: boolean = false) => {
    try {
      setCurrentSelectedChat((_prev) => chat);
      if (isNew == true) {
        setChats((_prev) => [...[chat], ..._prev]);
      }
    } catch (error) {}
  };

  return (
    <div className="chat-space bg-primary pt-[4.65rem]">
      <div className="flex h-screen antialiased text-gray-800 fixed">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div
            className={`${
              isActiveConversation == false ? 'hidden' : ''
            } sm:flex flex-col pl-6 pr-4 w-80 bg-primary flex-shrink-0   `}
          >
            <div className="flex flex-col mt-2 fixed h-screen w-full">
              <div className="flex flex-row items-center sm:justify-start text-xs pt-4 sm:pt-0">
                <span className="font-semibold text-lg text-white mr-4">Active Conversations</span>
                <CreateChat loadNewChat={loadNewChat} />

                <div className="sm:hidden">
                  {isActiveConversation == true ? (
                    <div className="relative left-7 text-white">
                      <IoMdClose
                        className="text-3xl"
                        onClick={(e) => {
                          displayActiveConversation(false);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-[31rem] overflow-y-auto sm:h-[80vh]">
                {chats &&
                  chats.map((chat: any) => {
                    return chat?.isGroupChat == false ? (
                      <>
                        {chat.members.map((member: any) => (
                          <>
                            {member._id != loggedInUser && (
                              <span className="px-2 rounded-xl py-1 cursor-pointer w-1/5 p-1 rounded-md">
                                <AvatarComponent
                                  name={`${member.full_name}`}
                                  className="hover:bg-gray-500"
                                  onClick={() => {
                                    setCurrentSelectedChat((_prev) => chat);
                                    setIsActiveConversation(false);
                                  }}
                                />
                              </span>
                            )}
                          </>
                        ))}
                      </>
                    ) : (
                      <button className="flex flex-row items-center w-1/5 p-1 rounded-xl px-2 py-1" key={chat.name}>
                        <AvatarComponent
                          name={chat.name}
                          onClick={() => {
                            setCurrentSelectedChat((_prev) => chat);
                            setIsActiveConversation(false);
                          }}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <ChattingArea
            displayActiveConversation={displayActiveConversation}
            isActiveConversation={isActiveConversation}
            currentChat={currentSelectedChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
