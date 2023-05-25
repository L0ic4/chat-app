import React from "react";
import Image from "next/image";

interface ChatHeadersProps {
  name: string;
  profile_pic: string;
  is_connected: boolean;
}

const ChatHeaders = (props: ChatHeadersProps) => {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <span className="block ml-2 font-bold text-gray-600">
        {props.name || "koto"}
      </span>

      {props.is_connected ? (
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      ) : (
        <span className="absolute w-3 h-3 bg-slate-500 rounded-full left-10 top-3"></span>
      )}
    </div>
  );
};

export default ChatHeaders;
