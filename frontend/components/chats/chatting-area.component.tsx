import React from "react";
import ChatHeader from "./chat-header.component";
import TypeMessage from "./type-message.component";

type Props = {};

const ChattingArea = (props: Props) => {
  return (
    <div className="flex flex-col flex-auto h-full">
      {/* {Object.keys(currentChat).length ? ( */}
      <>
        <div
          id="chat-header"
          className="shadow-xl py-2 px-6  border-1 fixed z-50 bg-primary text-white  w-full border-b-1"
        >
          <ChatHeader />
        </div>
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 min-h-min p-4 mt-12"
          style={{ width: "79vw" }}
          id="messages"
        >
          {/* {currentChat.messages?.map((message: any) => (
            <>
              <ChatMessage
                sender={message.sender}
                message={message.content}
                username="dsf "
              />
            </>
          ))} */}
        </div>

        <TypeMessage />
      </>
      {/* ) : (
        <>
          <Image src={ChatAreaImage} />
        </>
      )} */}
    </div>
  );
};

export default ChattingArea;
