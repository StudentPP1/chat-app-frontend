import { createContext } from "react";
import { ChatUser } from "../model/ChatUser";

export interface UserState {
    user: ChatUser | null
    setUser: (user: ChatUser) => void
}

const initUserState: UserState = {
    user: null,
    setUser: () => {}
}

export const UserContext = createContext<UserState>(initUserState);
