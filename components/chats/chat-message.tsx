import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

type ChatMessageProps = {
  sender: string;
  message: string;
  username: string;
  user_id?: string;
};
const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
  sender,
  message,
  username,
  user_id,
}) => {
  const [userId, setUserId] = useState<any>("");

  useEffect(() => {
    let id = getCookie("user-id");
    setUserId(id);
  }, [user_id]);

  return (
    <>
      {userId == sender ? (
        <>
          {/* SENDER JSX */}
          <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
              </div>
              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <span>{message}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col overflow-x-auto mb-4">
          <div className="flex flex-col">
            <div className="grid grid-cols-12 gap-y-2">
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  D
                  </div>
                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>{message}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
