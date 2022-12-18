import React, { useEffect, useState } from "react";
import AvatarComponent from "../../components/chats/avatar";
import ChattingArea from "../../components/chats/chatting-area";
import CreateChat from "../../components/chats/create-chat";
import { setCookie, getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import axios from "axios";
import { chat } from "../../utils/api_url";
import ChatHeader from "../../components/chats/chat-header";
import TypeMessage from "../../components/chats/type-message";
import ChatMessage from "../../components/chats/chat-message";
type Chatprops = {
  chats?: Array<{
    admin: any;
    isGroupChat: boolean;
    members: any;
    _id: string;
  }>;
  error?: any;
};
const Chats: React.FunctionComponent<Chatprops> = ({ chats }) => {
  const [activeChats, setActiveChats] = useState<any>([]);
  const [currentChat, setCurrentChat] = useState<any>({});
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setActiveChats(chats);
    let id: any = getCookie("user-id");
    setUserId(id);
  }, [chats]);

  const openCurrentChat = async (chat: any) => {
    setCurrentChat(chat);
    chat.members.map((member: any) => {
      if (member._id != userId) {
        setUsername(`${member.firstName} ${member.lastName}`);
      }
    });
  };

  const loadActiveChats = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.get(`${chat.fetchAllChats}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getCookie("auth-token")}`,
          },
        });
        setActiveChats(res.data.chat);
        resolve(true)
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="chat-space bg-primary">
      <div className="flex h-screen antialiased text-gray-800 fixed">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col pl-6 pr-4 w-80 bg-primary flex-shrink-0">
            <div className="flex flex-col mt-2 fixed h-screen">
              <div className="flex flex-row items-center justify-around text-xs">
                <span className="font-semibold text-lg text-white mr-4">
                  Active Conversations
                </span>
                <CreateChat reload={loadActiveChats} />
              </div>

              <div className="flex flex-col space-y-1 mt-4 -mx-2  overflow-y-auto">
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
              </div>
            </div>
          </div>
          <ChattingArea currentChat={currentChat} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    let token = getCookie("auth-token", context);
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
    let res = await axios.get(`${chat.fetchAllChats}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    let chats = res?.data?.chat;
    return { props: { chats } };
  } catch (error: any) {
    console.log(error);
    return { props: {} };
  }
};

export default Chats;
