import { useState } from "react"
import { ChatUser } from "../../model/ChatUser";
import { Chat } from "../../model/Chat";
import { Message } from "../../model/Message";
import ClientService from "../../api/ClientService";
import { MessageComponent } from "./MessageComponent";
import { ChatSidebar } from "../utils/ChatSidebar";

export const ChatComponent: React.FC<{
    setChats: any,
    user: ChatUser | null,
    activeChat: Chat,
    messages: Message[],
    client: ClientService,
    setActiveChat: any
}> = ({ setChats, user, activeChat, messages, client, setActiveChat }) => {
    const [messageInputValue, setMessageInputValue] = useState("");

    const createMessage = () => {
        const message = messageInputValue;
        const from = `${user?.username}`
        return {
            chatId: activeChat?.chatId,
            fromId: from,
            content: message,
            timestamp: new Date().toString()
        }
    }

    return (
        <div className="flex-1 bg-black border-l-2">
            {/* Chat Header */}
            <ChatSidebar
                setChats={setChats}
                user={user}
                chat={activeChat}
                setActiveChat={setActiveChat}
            />

            <div className="flex flex-col h-full w-full mx-auto p-4 bg-black chat-box">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 chat-area">
                    {messages
                        .map((message) => (
                            <MessageComponent
                                message={message}
                                user={user}
                                client={client}
                            />
                        ))}
                </div>

                {/* Input Area */}
                <div className="flex items-center mt-4 space-x-2">
                    <input
                        className="flex-1 bg-black"
                        placeholder="Type your message..."
                        value={messageInputValue}
                        onChange={(e) => setMessageInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                client.messageSend(createMessage())
                                setMessageInputValue("")
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}