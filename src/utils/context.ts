import { createContext } from "react";

export interface UserState {
    user: ChatUser | null
    setUser: (user: ChatUser) => void
}

const initialState: UserState = {
    user: null,
    setUser: () => {}
}

export const UserContext = createContext<UserState>(initialState);
