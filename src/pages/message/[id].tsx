import { SendMessageSchema } from "@/utils/Schemas";
import { MessageData, SendMessagesData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import { GetServerSideProps } from "next";
import requireAuth from "@/security/ProtectedRoute";
import router, { useRouter } from "next/router";

const MessageSender = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMessagesData>({ resolver: yupResolver(SendMessageSchema) });

  const CreateMessage = (data: SendMessagesData, channelId: number | null) => {
    const { id } = router.query;
    return {
      content: data.content,
      recipientId: id,
      channelId: channelId,
    };
  };

  const onSubmit = async (data: SendMessagesData) => {
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

const UserMessage = ({ messageData }: { messageData: MessageData }) => {
  const router = useRouter();
  const id = router.query.id;
  const messages = messageData.messages?.slice().reverse();
  return (
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
  );
};

export const getServerSideProps: GetServerSideProps = getMessages;
export default requireAuth(UserMessage);
