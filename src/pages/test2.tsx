import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type ChatFormData = {
    message: string;
};

const chatSchema = yup.object().shape({
    message: yup.string().required("Message is required"),
});

const Chat = () => {
    useEffect()

    const [messages, setMessages] = useState<string[]>([]);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ChatFormData>({
        resolver: yupResolver(chatSchema),
    });

    const onSubmit = (data: ChatFormData) => {
        setMessages([...messages, data.message]);
        reset();
    };

    return (
        <div className="bg-gray-100 w-full h-screen flex flex-col">
            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((message) => (
                    <div
                        key={message}
                        className="max-w-xs p-4 my-2 rounded-lg shadow-lg bg-blue-200 text-blue-800 self-start"
                    >
                        {message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center p-2">
                    <input
                        type="text"
                        className="flex-grow outline-none rounded-full px-4 py-2 bg-gray-100"
                        placeholder="Type your message"
                        {...register("message")}
                    />
                    <button
                        type="submit"
                        className="ml-2 rounded-full px-4 py-2 bg-blue-500 text-white"
                    >
                        Send
                    </button>
                </div>
                {errors.message && (
                    <p className="text-sm text-red-500 p-2">{errors.message.message}</p>
                )}
            </form>
        </div>
    );
};

export default Chat;