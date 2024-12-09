import { useState } from "react"
import { ChatUser } from "../../model/ChatUser";
import { Chat } from "../../model/Chat";
import { Message } from "../../model/Message";
import ClientService from "../../api/ClientService";
import { MessageComponent } from "./MessageComponent";

export const ChatComponent: React.FC<{
    user: ChatUser | null,
    activeChat: Chat,
    messages: Message[],
    client: ClientService
}> = ({ user, activeChat, messages, client }) => {
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
            <div className="flex items-center p-4 bg-black shadow">
                <div className="w-12 h-12 bg-white rounded-full">
                </div>

                <div className="ml-3">
                    <h2 className="text-lg font-semibold text-white">
                        {
                            activeChat.type == "PERSONAL"
                                ? activeChat.chatName.split("&").filter(name => name != `${user?.name}`)[0]
                                : activeChat.chatName
                        }
                    </h2>
                </div>
            </div>

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