export type UpdateMessageRequest = {
    messageId: string,
    chatId: string,
    fromId: string,
    content: string,
    type: string
};