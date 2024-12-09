export type ChatCreateRequest = {
    chatName: string,
    usernames: string[],
    owner?: string,
    type: string
}