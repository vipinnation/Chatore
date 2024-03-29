import { MessageAPI } from '@/services/api-calls/message.api-calls';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { FaCircleNotch } from 'react-icons/fa';
import SocketManager from '@/services/api-calls/socket.service';

type Props = {
  chat_id: string;
  sendMessage: any;
};

const TypeMessage: React.FC<Props> = ({ chat_id, sendMessage }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    return () => {
      setMessage('');
    };
  }, [chat_id]);

  const postMessage = async () => {
    try {
      setIsLoading((_prev) => true);
      sendMessage(message);
      setMessage('');
      setIsLoading((_prev) => false);
    } catch (error) {
      setIsLoading((_prev) => false);
    }
  };

  return (
    <>
      <div className="my-6"></div>
      <div
        className="flex flex-row items-center h-16 bg-primary shadow-xl border-top w-full sm:w-10/12 px-4"
        id="sendMessage"
      >
        <div>
          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow-09 ml-4">
          <div className="relative w-full">
            <input
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              value={message}
              placeholder="Type your message here"
              onChange={(e) => {
                setMessage((_prev) => e.target.value);
              }}
              disabled={isLoading}
            />
            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="ml-4">
          <button
            className="flex items-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white p-2 flex-shrink-0"
            onClick={postMessage}
            disabled={isLoading}
          >
            {isLoading == true ? (
              <>
                <span className="text-white animate-spin">
                  <FaCircleNotch />
                </span>
              </>
            ) : (
              <span>
                <IoIosSend className="text-3xl" />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default TypeMessage;
