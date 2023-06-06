import { SendMessageSchema } from "@/utils/Schemas";
import { MessageData, SendMessagesData } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/utils/SendData";
import { getMessages } from "@/api/API";
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

const UserMessage = ({ messageData }: { messageData: MessageData }) => {
  const router = useRouter();
  const id = router.query.id;
  const messages = messageData.messages?.slice().reverse();
  return (
    <>
      <div className="message-container">
        {messages?.map((message) => (
          <div key={message.id}>
            <div className={message.senderId != id ? "text-right" : ""}>
              <span className="text-xs">
                {message.senderId != id ? (
                  <p>Me :</p>
                ) : (
                  <p>{message.sender?.name + " : "}</p>
                )}
              </span>
              <p className="text-lg"> {message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <MessageSender />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getMessages;
export default requireAuth(UserMessage);
