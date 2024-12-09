import { Chat } from "../../model/Chat"
import { ChatUser } from "../../model/ChatUser"

export const ChatTitle: React.FC<{ chat: Chat, user: ChatUser | null }> = ({ chat, user }) => {
    return (
        <h2 className="block text-lg font-semibold text-white">
            {
                chat.type == "PERSONAL"
                    ? chat.users.filter(chatUser => chatUser.username != `${user?.username}`)[0].name
                    : chat.chatName
            }
        </h2>
    )
}