import { useState } from "react";
import { AddUsersModal } from "./AddUsersModal";
import ChatService from "../../api/ChatService";
import { ChatUser } from "../../model/ChatUser";
import { Chat } from "../../model/Chat";
import '../../css/ChatSidebar.css';

export const ChatSidebar: React.FC<{
    setChats: any,
    user: ChatUser | null,
    chat: Chat,
    setActiveChat: any
}> = ({ setChats, user, chat, setActiveChat }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const deleteChat = async () => {
        setIsOpen(false)
        setActiveChat(null)
        await ChatService.deleteChat(`${user?.username}`, chat.chatId)
    }

    const handleSubmit = async (users: string[]) => {
        setChats([])
        setIsOpen(false)
        await ChatService.addUsers(chat.chatId, users)
    };

    return (
        <div>
            {/* Chat Header */}
            <div
                className="flex items-center p-4 bg-black shadow cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>
                <div className="w-12 h-12 bg-white rounded-full">
                </div>

                <div className="ml-3">
                    <h2 className="text-lg font-semibold text-white">
                        {
                            chat.type == "PERSONAL"
                                ? chat.chatName.split("&").filter(name => name != `${user?.name}`)[0]
                                : chat.chatName
                        }
                    </h2>
                </div>
            </div>

            <div className={`chat-sidebar border z-10 bg-black ${isOpen ? 'open' : ''}`}>
                <div className="close bg-black">
                    <div className={`close-void ${isOpen ? 'open' : ''}`}>

                    </div>
                    <button className="close-button" onClick={() => setIsOpen(false)}>
                        x
                    </button>
                </div>

                <div className="flex items-center justify-left p-4 bg-black">
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
                    </div>
                </div>

                {chat.type === "GROUP"
                    ?
                    <div className="flex flex-col pt-5 pb-5">
                        <span className="text-center text-lg">Users</span>
                        <ul>
                            {chat.users.map(chatUser => (
                                <li>
                                    <div className="flex items-center p-4 bg-black flex-row">
                                        <div className="w-12 h-12 bg-white rounded-full">
                                        </div>
                                        <div className="ml-5 flex flex-col">
                                            <h2 className="block text-lg font-semibold text-white">
                                                {chatUser.name}
                                            </h2>

                                            {chat.owner === chatUser.username
                                                ?
                                                <div className="block text-sm text-gray-400">
                                                    owner
                                                </div>
                                                :
                                                <></>
                                            }

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <></>
                }
                <div className="relative divide-y divide-gray-100 rounded-lg shadow">
                    <ul>
                        <li
                            onClick={() => {
                                deleteChat();
                            }}
                            className="py-2">
                            <a
                                className="border ml-5 mr-5 text-sm text-gray-200 cursor-pointer hover:bg-gray-800 block px-4 py-2">
                                Leave
                            </a>
                        </li>
                        {chat.type === "GROUP" && chat.owner === user?.username
                            ?
                            <li
                                onClick={() => { setShowModal(true); }}
                                className="py-2">
                                <a
                                    className="border ml-5 mr-5 text-sm text-gray-200 cursor-pointer hover:bg-gray-800 block px-4 py-2">
                                    Add users
                                </a>
                            </li>

                            :
                            <></>
                        }
                    </ul>
                </div>
                <AddUsersModal
                    isOpen={showModal}
                    setOpen={setShowModal}
                    onSubmit={handleSubmit}
                    chat={chat}
                />
            </div>
        </div>
    );
};
