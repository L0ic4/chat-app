import Image from "next/image";
import React from "react";
import { ChannelDataType } from "@/utils/types";

interface Props extends ChannelDataType {}

const MessagesPreview = (props: Props) => {
  return (
    <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
      <Image
        width={10}
        height={10}
        className="object-cover rounded-full"
        src={""}
        alt="username"
      />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {props.channel.name}
          </span>
          <span className="block ml-2 text-sm text-gray-600">
            {props.channel.updatedAt || "5 minutes"}
          </span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">
          {props.channel.type || "private"}
        </span>
      </div>
    </a>
  );
};

export default MessagesPreview;
