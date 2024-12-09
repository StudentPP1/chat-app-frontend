import { useState } from "react";
import { Modal } from "./Modal";
import ChatService from "../../api/ChatService";
import { FoundUser } from "../../model/FoundUser";

export const AddUsersModal: React.FC<{
    isOpen: any,
    setOpen: any,
    onSubmit: any
}> = ({ isOpen, setOpen, onSubmit }) => {
    const [groupUsers, setGroupUsers] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [foundUsers, setFoundUsers] = useState<FoundUser[]>([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFoundUsers([])
        setGroupUsers([])
        setInputValue("")
    };

    const findUsers = async (username: string) => {
        await ChatService.findUsers(username).then((users) => {
            setFoundUsers(users)
            setInputValue("")
        })
    }

    return (
        <Modal isOpen={isOpen} setOpen={setOpen}>
            <div className="z-10 flex flex-1">
                <div className="block w-1/2">
                    <div className="p-3">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text" id="input-group-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search user"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        findUsers(inputValue)
                                    }
                                }} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                            {foundUsers.map((user) =>
                                <li>
                                    <div
                                        onClick={() => {
                                            if (groupUsers.indexOf(user.username) == -1) {
                                                setGroupUsers([...groupUsers, user.username])
                                            }
                                            setFoundUsers([])
                                        }}
                                        className="block text-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        {user.username}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="block w-1/2">
                    <div className="text-center pt-5">Selected</div>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                        {groupUsers.map((username) =>
                            <li>
                                <div
                                    onClick={() => setGroupUsers(groupUsers.filter(name => name != username))}
                                    className="block text-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    {username}
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-lg"
                onClick={() => {
                    onSubmit(groupUsers)
                    setOpen(false)
                }}
            >
                Submit
            </button>
        </Modal>
    );
};