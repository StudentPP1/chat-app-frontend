import { useEffect, useState } from "react"
import UserService from "../../api/UserService"
import { Chat } from "../../model/Chat"
import { ChatUser } from "../../model/ChatUser"

export const ChatImg: React.FC<{ chat: Chat, user: ChatUser | null }> = ({ chat, user }) => {
    const [userImg, setUserImg] = useState(null);

    const getUserImg = async () => {
        await UserService.getUser(
            chat.users.filter(chatUser => chatUser.username != `${user?.username}`)[0].username
        ).then((chatUsers) => {
            setUserImg(chatUsers[0].img)
        })
    }

    useEffect(() => {
        if (chat.type === "PERSONAL") {
            getUserImg()
        }
    }, [])

    return (
        <>
            {chat.type === "PERSONAL"
                ?
                userImg
                    ?
                    <img
                        src={"data:image/png;base64," + userImg}
                        className="w-12 h-12 bg-white rounded-full">
                    </img>
                    :
                    <div
                        className="w-12 h-12 bg-white rounded-full">
                    </div>
                :
                chat?.img
                    ?
                    <img
                        src={"data:image/png;base64," + chat?.img}
                        className="w-12 h-12 bg-white rounded-full">
                    </img>
                    :
                    <div
                        className="w-12 h-12 bg-white rounded-full">
                    </div>
            }
        </>
    )
}