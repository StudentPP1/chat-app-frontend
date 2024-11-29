import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import "../css/ChatList.css"
import { Avatar, AvatarImage } from "./ui/avatar";
import ChatService from "@/api/ChatService";
import { Chat } from "@/model/Chat";
import { Button } from "./ui/button";

// password: 1r;0F3Dw1EO[
// login: test

type FoundUser = {
    name: string,
    username: string
}

export const ChatList: React.FC<{
    activeChat: Chat | undefined,
    setActiveChat: any
}> = ({ activeChat, setActiveChat }) => {

    const [chats, setChats] = useState<Chat[]>([]);
    const [users, setUsers] = useState<FoundUser[]>([]);
    const [isFinding, SetIsFinding] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState("");

    const getChats = async () => {
        await ChatService.getUserChats().then((chats) => {
            setChats(chats)
        })
    }

    useEffect(() => {
        if (!isFinding) {
            getChats()
        }
    }, [isFinding])

    const findUsers = async (username: string) => {
        await ChatService.findUsers(username).then((users) => {
            console.log(users)
            SetIsFinding(true)
            setUsers(users)
        })
    }

    return (
        <div className="w-1/4 bg-black p-4">
            <div className="flex flex-row mb-4 mr-2">
                <Input
                    placeholder="Search users"
                    className={isFinding ? "w-4/5" : "w-full"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            findUsers(inputValue)
                        }
                    }} />
                {isFinding
                    ?
                    <button className="close-button w-1/5" onClick={() => {
                        setInputValue("")
                        SetIsFinding(false)
                    }}>
                        <span>X</span>
                    </button>
                    :
                    <></>
                }
            </div>

            <ul className="chats">
                {isFinding
                    ?
                    users?.map((user) => (
                        <li key={user.username}>
                            <div
                                // TODO: create a new chat
                                onClick={() => setActiveChat({ chatId: "", users: [], type: "" })}
                                className="flex items-center p-4 bg-black shadow chat"
                            >
                                <Avatar className="w-12 h-12 bg-white">
                                    <AvatarImage src={`data:image/png;base64,${null}`} />
                                </Avatar>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">{user.username}</h2>
                                </div>
                            </div>
                        </li>
                    ))
                    :
                    chats?.map((chat) => (
                        <li key={chat.chatId}>
                            <div
                                onClick={() => setActiveChat(chat)}
                                style={{ backgroundColor: `${chat.chatId === activeChat?.chatId ? "rgb(107 114 128)" : "transparent"}` }}
                                className="flex items-center p-4 bg-black shadow chat"
                            >
                                <Avatar className="w-12 h-12 bg-white">
                                    <AvatarImage src={`data:image/png;base64,${null}`} />
                                </Avatar>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">{chat.chatId}</h2>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
