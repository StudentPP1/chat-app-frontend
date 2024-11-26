import { ChatUser } from "./ChatUser";

export type Chat = {
    chatId: string,
    users: ChatUser[],
    type: string
};