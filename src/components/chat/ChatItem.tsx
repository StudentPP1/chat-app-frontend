import { useState } from "react";
import { Chat } from "../../model/Chat";
import { ChatUser } from "../../model/ChatUser";
import ChatService from "../../api/ChatService";
import { AddUsersModal } from "../utils/AddUsersModal";

export const ChatItem: React.FC<{
    user: ChatUser | null,
    chat: Chat,
    getCurrentChat: any,
    notReadChats: Chat[],
    activeChat: Chat | null,
}> = ({ user, chat, getCurrentChat, notReadChats, activeChat }) => {
    return (
        <>
            <div
                onClick={() => {
                    getCurrentChat(chat.chatId)
                    const index = notReadChats.indexOf(chat);
                    if (index > -1) {
                        notReadChats.splice(index, 1);
                    }
                }}
                style={{ backgroundColor: `${chat.chatId === activeChat?.chatId ? "rgb(107 114 128)" : "transparent"}` }}
                className="flex items-center p-4 bg-black shadow chat flex-row"
            >
                <div className="w-12 h-12 bg-white rounded-full">
                </div>

                <div className="ml-5 flex flex-col">
                    <h2 className="block text-lg font-semibold text-white">
                        {
                            chat.type == "PERSONAL"
                                ? chat.chatName.split("&").filter(name => name != `${user?.name}`)[0]
                                : chat.chatName
                        }
                    </h2>

                    {chat.messages.length > 0
                        ?
                        <div className="block text-sm text-gray-400">
                            {chat.messages[chat.messages.length - 1].content}
                        </div>
                        :
                        <></>
                    }
                </div>

                {notReadChats.includes(chat)
                    ?
                    <div className="flex flex-row justify-end">
                        <div className="ml-5 w-6 h-6 bg-white rounded-full justify-end">
                        </div>
                    </div>
                    : <></>
                }
            </div>
        </>
    )
}