'use client';
import SocketManager from '@/services/api-calls/socket.service';
import { CookieProvider } from '@/utils/cookies.util';
import images from '@/utils/images.utils';
import React, { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import ChatHeader from './chat-header.component';
import ChatMessage from './message.component';
import TypeMessage from './type-message.component';

type Props = {
  displayActiveConversation: any;
  isActiveConversation: boolean;
  currentChat?: any;
};

const ChattingArea: React.FC<Props> = ({ displayActiveConversation, isActiveConversation, currentChat }) => {
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [chat_id, setChat_id] = useState<string>('');
  const [messages, setMessages] = useState<Array<any>>([]);
  const chat = useRef<any>({ messages: [] });
  const chatMessageContainer = useRef<any>();
  let index = 0;

  let socketManager: any = null;
  useEffect(() => {
    getUserName();
    connectToSocket();
    scrollToBottom();
    return () => {
      index = 0;
      disconnectSocket();
      setMessages([]);
    };
  }, [index, currentChat, chat.current]);

  const getUserName = async () => {
    try {
      chat.current = currentChat;
      setMessages(currentChat.messages);
      let userId = await CookieProvider.getCookie('_id');
      setUserId((_prev) => userId as any);
      if (currentChat && Object.keys(currentChat).length > 0) {
        setChat_id((_prev) => currentChat._id);
        if (currentChat.isGroupChat == false) {
          let user = currentChat.members.find((member: any) => member._id != userId);
          if (user) {
            setUsername(user.full_name);
          }
        } else {
          setUsername(currentChat.name);
        }
      }
    } catch (error) {}
  };

  const connectToSocket = async () => {
    try {
      if (currentChat && Object.keys(currentChat).length > 0) {
        socketManager = new SocketManager();
        socketManager.createConnection().then(() => {
          socketManager.joinRoom(currentChat.name);
          socketManager.receiveMessage(handleReceivedMessage);
        });
      }
    } catch (error) {}
  };

  const sendMessage = async (message: string) => {
    try {
      if (socketManager) {
        socketManager.sendMessage(message, currentChat.name, chat_id);
      } else {
        socketManager = new SocketManager();
        socketManager.createConnection().then(() => {
          socketManager.sendMessage(message, currentChat.name, chat_id);
        });
      }
      scrollToBottom();
    } catch (error) {}
  };

  const handleReceivedMessage = (msg: any) => {
    try {
      if (msg && msg.room == currentChat.name) {
        setMessages((prev) => [...prev, ...[msg.saveMessage]]);
        index = index + Number(1);
      }
    } catch (error) {}
  };

  const disconnectSocket = () => {
    try {
      socketManager.disconnectSocket();
    } catch (error) {}
  };

  const scrollToBottom = () => {
    try {
      let timeout = setTimeout(() => {
        if (chatMessageContainer.current) {
          chatMessageContainer.current.scrollIntoView({ behavior: 'smooth' });
        }
        clearTimeout(timeout);
      }, 1500);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col flex-auto h-full z-50">
      {chat.current && Object.keys(chat.current).length ? (
        <>
          <div id="chat-header" className="shadow-xl py-2 border-1 fixed z-50 bg-primary text-white  w-full border-b-1">
            <div className="flex items-center">
              <div className="flex items-center mobile:relative left-8 sm:hidden pt-2 mx-2">
                {isActiveConversation == false ? (
                  <GiHamburgerMenu
                    className="text-3xl"
                    onClick={(e) => {
                      displayActiveConversation(true);
                    }}
                  />
                ) : null}
              </div>
              <ChatHeader name={username} chat={currentChat} />
            </div>
          </div>
          <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100  p-4 mt-12 sm:w-[79vw] w-[100vw]"
            id="messages"
          >
            {messages && messages.length > 0 ? (
              <>
                <div id="chat-container" className="h-[70vh] sm:h-[68vh] overflow-y-auto" ref={chatMessageContainer}>
                  {messages?.map((message: any) => (
                    <ChatMessage
                      sender={message.sender}
                      message={message.content}
                      username={username}
                      key={message._id}
                      user_id={userId}
                    />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <TypeMessage chat_id={chat_id} sendMessage={sendMessage} />
        </>
      ) : (
        <div className="flex items-center justify-center float-right">
          <img src={images.home_4.src as any} />
        </div>
      )}
    </div>
  );
};

export default ChattingArea;
