import { SendMessageSchema } from "@/utils/Schemas";
import { MessageListData, SendMessageDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import requireAuth from "@/security/ProtectedRoute";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import { MessageFetcher } from "@/utils/FetchData";

const MessageSender = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageDataType>({
    resolver: yupResolver(SendMessageSchema),
  });

  const CreateMessage = (data: SendMessageDataType) => {
    const { id } = router.query;
    return {
      content: data.content,
      channelId: id,
    };
  };

  const onSubmit = async (data: SendMessageDataType): Promise<void> => {
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

const UserMessage = () => {
  const { data } = useSWR<MessageListData, Error>(
    "messageData",
    MessageFetcher,
    {
      refreshInterval: 1000,
    }
  );

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
