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
    getUserChats: any
    setActiveChat: any
}> = ({ user, chat, getCurrentChat, notReadChats, activeChat, getUserChats, setActiveChat }) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (e: any) => {
        e.preventDefault()
        if (e.button === 2) {
            setIsClick(!isClick)
        }
    };

    const deleteChat = async () => {
        if (activeChat?.chatId === chat.chatId) {
            setActiveChat(null)
        }
        await ChatService.deleteChat(`${user?.username}`, chat.chatId)
    }

    const handleSubmit = async (users: string[]) => {
        await ChatService.addUsers(chat.chatId, users)
    };

    return (
        <>
            <div
                onMouseDown={(e) => handleClick(e)}
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

            <div className={`relative bg-gray-800 divide-y divide-gray-100 rounded-lg shadow ${isClick ? "visible" : "hidden"}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                        <a
                            onClick={() => {
                                setIsClick(false);
                                deleteChat();
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Delete
                        </a>
                    </li>
                    {chat.type === "GROUP"
                        ?
                        <li>
                            <a
                                onClick={() => { setIsClick(false); setIsOpen(true); }}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Add users
                            </a>
                        </li>
                        :
                        <></>
                    }
                </ul>
            </div>
            <AddUsersModal
                isOpen={isOpen}
                setOpen={setIsOpen}
                onSubmit={handleSubmit}
            />
        </>
    )
}