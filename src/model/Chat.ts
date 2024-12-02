import { ChatUser } from "./ChatUser";
import { Message } from "./Message";

export type Chat = {
    chatName: string,
    chatId: string,
    users: ChatUser[],
    type: string
    messages: Message[]
};