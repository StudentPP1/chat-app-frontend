import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import "../css/ChatList.css"
import { Avatar, AvatarImage } from "./ui/avatar";

export const ChatList: React.FC = () => {
    const [chats, setChats] = useState(["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]);

    return (
        <div className="w-1/4 bg-black p-4">
            <Input placeholder="Search users" className="mb-4" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setChats(["1"])
                }
            }} />
            <ul className="tags-menu">
                {chats?.map((chat) => (
                    <li key={chat}>
                        <div className="flex items-center p-4 bg-black shadow chat">
                            <Avatar className="w-12 h-12 bg-white">
                                <AvatarImage src={`data:image/png;base64,${null}`} />
                            </Avatar>
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold">{chat}</h2>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
