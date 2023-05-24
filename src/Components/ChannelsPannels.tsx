import React from "react";
import MessagesPreview from "./ChannelsPreviewer";
import SearchBar from "./SearchBar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";
import { ChannelDataType2 } from "@/utils/types";

const MessagesPanels = (props:ChannelDataType2) => {
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <SearchBar />
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
      <ul className="overflow-auto h-[32rem]">
        <li>
          {props.channel.map((item) => (
            <MessagesPreview status={false} channel={item}/>
          ))}

          <Link
            className="flex items-center p-4 transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
            href={"/channel/create"}
          >
            <AiOutlinePlusCircle />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MessagesPanels;
