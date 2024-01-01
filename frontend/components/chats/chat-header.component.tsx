'use client';
import { Drawer, Box, Divider } from '@mui/material';
import { IoCloseSharp } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import AvatarComponent from './avatar.component';
import { LoadingButton } from '@mui/lab';

type Props = {
  name: string | undefined | null;
  chat: any;
};

const ChatHeader: React.FC<Props> = ({ name, chat }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userChat, setUserChat] = useState<any>({});

  useEffect(() => {
    console.log('Chat ', chat);
    setUserChat((_prev: any) => chat);
  }, [chat, name]);

  return (
    <div className="container w-full">
      <React.Fragment>
        <span
          className="cursor-pointer"
          onClick={(e) => {
            setIsOpen((_prev) => true);
          }}
        >
          <AvatarComponent name={name as string} />
        </span>
        <Drawer anchor={'right'} open={isOpen} onClose={() => setIsOpen((_prev) => false)}>
          <Box
            sx={{
              width: 350
            }}
          >
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200  w-full  px-4 rounded-lg">
              <span className="py-3 text-3xl w-full">
                <IoCloseSharp className="float-right" onClick={() => setIsOpen((_prev) => false)} />
              </span>
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-lg capitalize font-semibold mt-2">{name}</div>
              <div className="text-xs text-gray-500"></div>
            </div>
            <div>
              {userChat && Object.keys(userChat).length > 0 ? (
                <div className="mx-2">
                  <span className="py-1 mb-3 font-semibold text-lg">Members</span>
                  <Divider />
                  <div className="mt-3">
                    {userChat.members.length > 0 ? (
                      <>
                        {userChat.members.map((item: any) => (
                          <button className="flex flex-row items-center w-1/5 p-1 rounded-xl px-2 py-1" key={chat.name}>
                            <AvatarComponent name={item.full_name} />
                          </button>
                        ))}
                      </>
                    ) : (
                      <div>
                        <p className="text-md font-semibold">No Members</p>
                      </div>
                    )}
                    <LoadingButton variant="contained" className="bg-primary w-full my-4">
                      Add New Member
                    </LoadingButton>
                  </div>
                </div>
              ) : null}
            </div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ChatHeader;
