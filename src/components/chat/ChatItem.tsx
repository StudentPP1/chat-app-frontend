import { Chat } from "../../model/Chat";
import { ChatUser } from "../../model/ChatUser";
import { ChatImg } from "../utils/ChatImg";
import { ChatTitle } from "../utils/ChatTitle";

export const ChatItem: React.FC<{
    user: ChatUser | null,
    chat: Chat,
    getCurrentChat: any,
    notReadChats: Chat[],
    activeChat: Chat | null,
    getUserChats: any
}> = ({ user, chat, getCurrentChat, notReadChats, activeChat, getUserChats }) => {
    return (
        <>
            <div
                onClick={() => {
                    getCurrentChat(chat.chatId).then(() => {
                        const index = notReadChats.indexOf(chat);
                        if (index > -1) {
                            notReadChats.splice(index, 1);
                        }
                    })
                }}
                style={{ backgroundColor: `${chat.chatId === activeChat?.chatId ? "rgb(107 114 128)" : "transparent"}` }}
                className="flex items-center p-4 bg-black shadow chat flex-row"
            >
                <ChatImg chat={chat} user={user} />

                <div className="ml-5 flex flex-col">
                    <ChatTitle chat={chat} user={user} />
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