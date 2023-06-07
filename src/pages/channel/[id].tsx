import { SendMessageSchema } from "@/utils/Schemas";
import { MessageData, SendMessagesData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import requireAuth from "@/security/ProtectedRoute";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const MessageSender = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessagesData>({ resolver: yupResolver(SendMessageSchema) });

  const CreateMessage = (data: SendMessagesData) => {
    const { id } = router.query;
    return {
      content: data.content,
      channelId: id,
    };
  };

  const onSubmit = async (data: SendMessagesData): Promise<void> => {
    reset();
    sendMessage({
      endpoint: "message",
      method: "post",
      data: CreateMessage(data),
      isToken: true,
    });
  };

  return (
    <form name="sendMessageForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center p-2">
        <input
          {...register("content", {
            required: true,
          })}
          type="text"
          placeholder="Type your message"
          className="flex-grow outline-none rounded-full px-4 py-2 bg-gray-100"
        />
        <button
          type="submit"
          className="ml-2 rounded-full px-4 py-2 bg-blue-500 text-white"
        >
          Send
        </button>
        {errors.content && (
          <p className="text-sm text-red-500 p-2">{errors.content.message}</p>
        )}
      </div>
    </form>
  );
};

const fetcher = async () => {
  const TOKEN = Cookies.get("jetonJWT");
  const response = await axios.get("http://localhost:8080/messages/channel/1", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const message = await response.data;
  return message;
};

const UserMessage = () => {
  const { data } = useSWR<MessageData, Error>("messageData", fetcher, {
    refreshInterval: 1000,
  });

  const router = useRouter();
  const id = router.query.id;
  const messages = data?.messages?.slice().reverse();
  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={
              (message.senderId !== id ? "text-right bg-blue-200" : "") +
              " p-4 my-2 rounded-lg shadow-lg"
            }
          >
            {message.content}
          </div>
        ))}
      </div>
      <MessageSender />
    </div>
  );
};

export default requireAuth(UserMessage);
