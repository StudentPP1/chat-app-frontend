import { Chat } from "../../model/Chat"

export const ChatImg: React.FC<{ chat: Chat }> = ({ chat }) => {
    return (
        <>
            {chat?.img
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