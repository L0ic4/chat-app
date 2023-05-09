import React from "react";
import MessagesContent from "./MessagesContent";

interface MessagesListProps {
  id: number;
  messages: string;
  sender_or_receiver: boolean;
}
interface Props {
  Donne: MessagesListProps[];
}

const MessagesLists = (props: Props) => {
  return (
    <ul className="space-y-2">
      {props?.Donne?.map((message) => (
        <MessagesContent
          key={message.id}
          sender_or_receiver={message.sender_or_receiver}
          message={message.messages}
        />
      ))}
    </ul>
  );
};

export default MessagesLists;
