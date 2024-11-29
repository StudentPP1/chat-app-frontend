import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import "../css/ChatBox.css"
import { Avatar, AvatarImage } from "./ui/avatar";
import { Chat } from "@/model/Chat";
import { ChatUser } from "@/model/ChatUser";
import ChatService from "@/api/ChatService";

type Message = {
    sender: "user" | "bot";
    text: string;
};
// TODO: sending message & set Messages
export const ChatBox: React.FC<{
    activeChat: Chat,
    messageSend: any,
    user: ChatUser | null
}> = ({activeChat, messageSend, user}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");

    const createMessage = () => {
        const message = inputValue;
        const to = activeChat.users;
        const from = user?.username
        if (from != null && typeof message == "string" && typeof to == "string") {
          return {
            chatId: from + "&" + to + "&" + Date.now().toString(),
            fromId: from,
            toId: to,
            content: message,
            timestamp: new Date().toString()
          }
        }
        else {
          throw new Error();
        }
    }

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newMessage: Message = { sender: "user", text: inputValue };
        setMessages((prev) => [...prev, newMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                sender: "bot",
                text: "What seems to be the problem?",
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);

        // Clear input field
        setInputValue("");
    };

    useEffect(() => {
        const getMessages = async () => {
            console.log(await ChatService.getMessages(activeChat.chatId))
        }
        getMessages()
    }, [messages])

    return (
        <div className="flex-1 flex flex-col bg-black">
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-black shadow">
                <Avatar className="w-12 h-12 bg-white">
                    <AvatarImage src={`data:image/png;base64,${null}`} />
                </Avatar>
                <div className="ml-3">
                    <h2 className="text-lg font-semibold">Sofia Davis</h2>
                </div>
            </div>

            <div className="flex flex-col h-full w-full mx-auto p-4 bg-black chat-box">
                {/* Chat Area */}
                <Card className="flex-1 overflow-y-auto p-4 chat-area">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg ${message.sender === "user"
                                    ? "bg-blue-500 text-white w-1/3"
                                    : "bg-gray-200 text-black w-1/3"
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </Card>

                {/* Input Area */}
                <div className="flex items-center mt-4 space-x-2">
                    <Input
                        className="flex-1 bg-black"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage() 
                            }
                        }}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
};
