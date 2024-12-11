import { useEffect, useState } from "react";
import { ChatUser } from "../../model/ChatUser";
import { Chat } from "../../model/Chat";
import { FoundUser } from "../../model/FoundUser";
import Sidebar from "../utils/Sidebar";
import ChatService from "../../api/ChatService";
import { ChatItem } from "./ChatItem";


export const ChatList: React.FC<{
    user: ChatUser | null,
    setUser: any
    setMessages: any,
    setActiveChat: any,
    activeChat: Chat | null,
    notReadChats: Chat[],
    chats: Chat[],
    getUserChats: any
}> = ({ user, setUser, setMessages, setActiveChat, activeChat, notReadChats, chats, getUserChats }) => {
    const [foundUsers, setFoundUsers] = useState<FoundUser[]>([]);
    const [isFinding, SetIsFinding] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState("");

    const findUsers = async (username: string) => {
        await ChatService.findUsers(username).then((users) => {
            SetIsFinding(true)
            setFoundUsers(users)
        })
    }

    const getCurrentChat = async (chatId: string) => {
        await ChatService.getChat(chatId).then((currentChat) => {
            setMessages(currentChat.messages)
            setActiveChat(currentChat)

            console.log("get chat: ")
            console.dir(currentChat)
            console.log("get messages: ")
            console.dir(currentChat.messages)
        })
    }

    const setChat = async (foundUser: FoundUser) => {
        let isFind = false;
        for (const chat of chats) {
            if (
                chat.type == "PERSONAL"
                && chat.chatName.split("&").filter((name) => name == `${user?.name}`).length != 0
            ) {
                isFind = true;
                getCurrentChat(chat.chatId)
            }
        }
        if (!isFind) {
            await ChatService.createChat({
                chatName: "",
                owner: undefined,
                usernames: [`${user?.username}`, foundUser.username],
                type: "PERSONAL"
            }).then((createdChat) => {
                getCurrentChat(createdChat.chatId)
            })
        }
        setInputValue("")
        SetIsFinding(false)
    }

    const createChat = async (name: string, usernames: string[]) => {
        // send creating group
        await ChatService.createChat({
            chatName: name,
            owner: `${user?.username}`,
            usernames: [...usernames, `${user?.username}`],
            type: "GROUP"
        }).then(() => {
            // update user chats
            getUserChats()
        })
    }

    useEffect(() => {
        if (isFinding === false) {
            getUserChats()
        }
    }, [isFinding])

    return (
        <div className="w-1/4 bg-black p-4">
            <div className="flex flex-row mb-4 mr-2">
                <div className="flex flex-row bg-black shadow w-full">
                    <Sidebar 
                    user={user} 
                    setUser={setUser}
                    createChat={createChat} 
                    activeChat={activeChat}
                    getCurrentChat={getCurrentChat}
                    getUserChats={getUserChats}
                    />
                    <div className="pl-5 flex items-center">
                        <input
                            placeholder="Search users"
                            className={isFinding ? "w-5/6 bg-black" : "w-full bg-black"}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    findUsers(inputValue)
                                }
                            }} />
                        {isFinding
                            ?
                            <button className="close-button w-1/6" onClick={() => {
                                setInputValue("")
                                SetIsFinding(false)
                            }}>
                                <span>X</span>
                            </button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>

            <ul className="chats">
                {isFinding
                    ?
                    foundUsers?.map((foundUser) => (
                        <li key={foundUser.username}>
                            <div onClick={() => setChat(foundUser)} className="flex items-center p-4 bg-black shadow chat">
                                <div className="w-12 h-12 bg-white rounded-full">
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">{foundUser.username}</h2>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    chats?.map((chat) => (
                        <li key={chat.chatId}>
                           <ChatItem
                           user={user}
                           chat={chat}
                           getCurrentChat={getCurrentChat}
                           notReadChats={notReadChats}
                           activeChat={activeChat}
                           getUserChats={getUserChats}
                           />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}