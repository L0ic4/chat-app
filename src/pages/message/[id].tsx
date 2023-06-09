import { SendMessageSchema } from "@/utils/Schemas";
import { MessageListData, SendMessageDataType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import requireAuth from "@/security/ProtectedRoute";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import { MessageUserFetcher } from "@/utils/FetchData";
import Head from "next/head";

const MessageSender = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessageDataType>({
    resolver: yupResolver(SendMessageSchema),
  });

  const CreateMessage = (
    data: SendMessageDataType,
    channelId: number | null
  ) => {
    const { id } = router.query;
    return {
      content: data.content,
      recipientId: id,
      channelId: channelId,
    };
  };

  const onSubmit = async (data: SendMessageDataType) => {
    sendMessage({
      endpoint: "message",
      method: "post",
      data: CreateMessage(data, null),
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
      </div>
      {errors.content && (
        <p className="text-sm text-red-500 p-2">{errors.content.message}</p>
      )}
    </form>
  );
};

const UserMessage = () => {
  const router = useRouter();
  const id = router.query.id;
  const userMessage = useSWR<MessageListData, Error>(
    `${id}`,
    MessageUserFetcher,
    {
      refreshInterval: 1000,
    }
  ).data;

  const messages = userMessage?.messages?.slice().reverse();
  return (
    <>
      <Head>
        <title>{`USER: ${id} | Chat App`}</title>
      </Head>
      <div className="bg-gray-100 w-full h-screen flex flex-col">
        <div className="flex-grow p-4 overflow-y-auto">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={
                (message.senderId == id ? "text-right bg-blue-200" : "") +
                " p-4 my-2 rounded-lg shadow-lg"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <MessageSender />
      </div>
    </>
  );
};

export default requireAuth(UserMessage);
