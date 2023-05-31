import { SendMessageSchema, loginSchema } from "@/utils/Schemas";
import { MessageData, SendMessagesData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import { getMessages } from "@/api/API";
import { GetServerSideProps } from "next";
import requireAuth from "@/security/ProtectedRoute";

const MessageShow = ({ messageData }: { messageData: MessageData }) => {
  return (
    <div>
      <div>
        <h2>{messageData?.messages?.[0].content}</h2>
        <p>{messageData?.status}</p>
      </div>
    </div>
  );
};

const MessageSender = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessagesData>({ resolver: yupResolver(SendMessageSchema) });

  const onSubmit = (data: SendMessagesData) => {
    const Data = {
      content: data.content,
      recipientId: 1,
      channelId: null,
    };
    reset();
    console.log(Data);
    sendMessage("message", "post", Data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your message
        </label>
        <input
          {...register("content", {
            required: true,
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>
    </form>
  );
};

const UserMessage = () => {
  return (
    <>
      <MessageShow />
      <MessageSender />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = getMessages;
export default requireAuth(UserMessage);
