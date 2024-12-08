import { useState } from "react";
import { Message } from "../model/Message"
import { ChatUser } from "../model/ChatUser";

export const MessageComponent: React.FC<{
    message: Message,
    user: ChatUser | null,
    updateMessage: any,
    deleteMessage: any
}> = ({ message, user, updateMessage, deleteMessage }) => {
    const [isClick, setIsClick] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");

    const createUpdateMessageRequest = () => {
        return {
            messageId: message.messageId,
            chatId: message.chatId,
            fromId: message.fromId,
            content: newContent,
            type: "UPDATE"
        }
    }
    const createDeleteMessageRequest = () => {
        return {
            messageId: message.messageId,
            chatId: message.chatId,
            fromId: message.fromId,
            type: "DELETE"
        }
    }
    const handleClick = (e: any) => {
        console.log(e.button)
        if (e.button === 0 && message.fromId === user?.username) {
            setIsClick(!isClick)
        }
    };

    return (
        <div
            className={`flex gap-2.5 ${message.fromId === user?.username ? "justify-end" : "justify-start"}`}
        >
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {message.fromId}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {message.timestamp.match(/\d{2}:\d{2}:\d{2}/)}
                    </span>
                </div>
                {isUpdate
                    ?
                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <input
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setIsClick(false)
                                    setIsUpdate(false)
                                    updateMessage(createUpdateMessageRequest())
                                    setContent("");
                                    setNewContent("");
                                }
                            }}
                            className="flex flex-col bg-gray-100 text-sm font-normal dark:bg-gray-700"
                        />
                    </div>
                    :
                    <div
                        onMouseDown={(e) => handleClick(e)}
                        className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                            {message.content}
                        </p>
                    </div>
                }
                <div className={`relative bg-gray-800 divide-y divide-gray-100 rounded-lg shadow ${isClick ? "visible" : "hidden"}`}>
                    {isUpdate
                        ?
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a
                                    onClick={() => { 
                                        setIsClick(false); 
                                        setIsUpdate(false); 
                                        setContent("");
                                        setNewContent("");
                                    }}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    X
                                </a>
                            </li>
                        </ul>
                        :
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a
                                    onClick={() => { 
                                        setIsClick(true); 
                                        setIsUpdate(true); 
                                        setContent(message.content);
                                        setNewContent(message.content);
                                     }}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Update
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => {setIsClick(false); deleteMessage(createDeleteMessageRequest())}}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Delete
                                </a>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

