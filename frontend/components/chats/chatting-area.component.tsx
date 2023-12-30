'use client';
import { CookieProvider } from '@/utils/cookies.util';
import images from '@/utils/images.utils';
import React, { useEffect, useState } from 'react';
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
  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    getUserName();
  }, [currentChat]);

  const getUserName = async () => {
    try {
      setChat((_prev: any) => currentChat);
      let userId = await CookieProvider.getCookie('_id');
      setUserId((_prev) => userId as any);
      if (currentChat && Object.keys(currentChat).length > 0) {
        console.log(currentChat);
        setChat_id((_prev) => currentChat._id);
        if (currentChat.isGroupChat == false) {
          let user = currentChat.members.find((member: any) => member._id != '65897da27e4a17a24e163d02');
          if (user) {
            setUsername(user.full_name);
          }
        } else {
          setUsername(currentChat.name);
        }
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col flex-auto h-full">
      {chat && Object.keys(chat).length ? (
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
              <ChatHeader name={username} />
            </div>
          </div>
          <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 min-h-min p-4 mt-12 sm:w-[79vw] w-[100vw]"
            id="messages"
          >
            {chat.messages && chat.messages.length > 0 ? (
              <>
                {chat.messages?.map((message: any) => (
                  <ChatMessage
                    sender={message.sender}
                    message={message.content}
                    username={username}
                    key={Math.floor(Math.random() * 1e4)}
                    user_id={userId}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>

          <TypeMessage chat_id={chat_id} />
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
