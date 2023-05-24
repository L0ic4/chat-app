import React from "react";
import MessagesPreview from "./MessagesPreview";
import SearchBar from "./SearchBar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";

const MessagesPanels = () => {
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <SearchBar />
      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        <li>
          <MessagesPreview
            profile_pic={""}
            name={""}
            last_message={""}
            sent_time={""}
          />
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
