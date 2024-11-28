import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import "../css/ChatList.css"

export const ChatList: React.FC = () => {
    const [chats, setChats] = useState(["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]);

    return (
        <div className="w-1/4 bg-black p-4 border-r">
            <Input placeholder="Search users" className="mb-4" />
            <ul className="tags-menu">
                {chats?.map((chat) => (
                    <li key={chat}>
                        {chat}
                    </li>
                ))}
            </ul>
        </div>
    );
};
