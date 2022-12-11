import React from "react";
import ChatHeader from "./chat-header";
import ChatMessage from "./chat-message";
import TypeMessage from "./type-message";

const ChattingArea = () => {
  return (
    <div className="flex flex-col flex-auto h-full">
      <div className="shadow-xl py-2 px-6  border-1 fixed z-50 bg-primary text-white  w-full border-b-1">
        <ChatHeader name="Vipin Megwal" />
      </div>
      <div
        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 min-h-min p-4 mt-12" style={{width:"79vw"}}
        id="messages"
      >
        <ChatMessage sender={"A"} message={"Hello"} username="dsf " />
        <ChatMessage sender={"A"} message={"Hi"} username="Vipin" />
        <ChatMessage sender={"A"} message={"Howdy !"} username="dsf" />
        <ChatMessage
          sender={"A"}
          message={"good and about u ?"}
          username="Vipin"
        />
      </div>

      <TypeMessage />
    </div>
  );
};

export default ChattingArea;
