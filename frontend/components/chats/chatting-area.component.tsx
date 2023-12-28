import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import ChatHeader from './chat-header.component';
import ChatMessage from './message.component';
import TypeMessage from './type-message.component';

type Props = {
  displayActiveConversation: any;
  isActiveConversation: boolean;
};

const ChattingArea: React.FC<Props> = ({ displayActiveConversation, isActiveConversation }) => {
  return (
    <div className="flex flex-col flex-auto h-full">
      {/* {Object.keys(currentChat).length ? ( */}
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
            <ChatHeader />
          </div>
        </div>
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 min-h-min p-4 mt-12 sm:w-[79vw] w-[100vw]"
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
          <ChatMessage sender={'message.sender'} message={'message.content'} username="dsf " />
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
