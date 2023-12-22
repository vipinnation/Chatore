"use client";
import { Drawer, Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import AvatarComponent from "./avatar.component";

type Props = {};

const ChatHeader = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="container w-full">
      <React.Fragment>
        <span
          className="cursor-pointer"
          onClick={(e) => {
            setIsOpen((_prev) => true);
          }}
        >
          <AvatarComponent name={"Name"} />
        </span>
        <Drawer
          anchor={"right"}
          open={isOpen}
          onClose={(e) => setIsOpen((_prev) => false)}
        >
          <Box
            sx={{
              width: 500,
            }}
          >
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200  py-6 w-full  px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <Image
                  src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">Aminos Co.</div>
              <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                  <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div className="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default ChatHeader;
