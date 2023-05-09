import React from "react";

interface MessagesContentProps {
  sender_or_receiver: boolean;
  message: string;
}

const MessagesContent = (props: MessagesContentProps) => {
  return (
    <>
      {props.sender_or_receiver ? (
        <li className="flex justify-end">
          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
            <span className="block">{props.message || "Hi"}</span>
          </div>
        </li>
      ) : (
        <li className="flex justify-start">
          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
            <span className="block">{props.message || "Hi"}</span>
          </div>
        </li>
      )}
    </>
  );
};

export default MessagesContent;
