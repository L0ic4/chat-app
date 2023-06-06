import React, { useState } from "react";

type ChatMessage = {
    id: number;
    sender: string;
    message: string;
}

type ChatProps = {
    messages: ChatMessage[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add new message to messages array
    }

    return (
        <div className="bg-gray-100 w-full h-screen flex flex-col">
            <div className="overflow-y-auto flex-grow">
                {messages.map((message) => (
                    <div key={message.id} className="flex flex-col items-start mt-2 px-4">
                        <div className="bg-indigo-500 text-white px-2 py-1 rounded-md">
                            <p className="font-bold">{message.sender}</p>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-2 px-4 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                    Send
                </button>
            </form>
        </div>
    );
}

export default function App() {
    const initialMessages = [
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
        { id: 1, sender: "Jane", message: "Hello!" },
        { id: 2, sender: "John", message: "Hi there!" },
        { id: 3, sender: "Jane", message: "How are you doing?" },
        { id: 4, sender: "John", message: "I'm doing great, thanks for asking!" },
    ];

    return (
                <Chat messages={initialMessages} />
    );
}