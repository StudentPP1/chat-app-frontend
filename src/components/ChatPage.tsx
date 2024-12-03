import "../css/ChatPage.css";
import { useContext, useEffect, useState } from 'react';
import SockJS from "sockjs-client"
import { CompatClient, Stomp } from '@stomp/stompjs';
import { UserContext, UserState } from '../utils/context';
import ChatService from '../api/ChatService';
import { Message } from '../model/Message';
import { Chat } from '../model/Chat';
import { FoundUser } from "../model/FoundUser";
import { Navbar } from "./Navbar";

// 1.
// password: 1r;0F3Dw1EO[
// login: test

// 2.
// password: 1r;0F3Dw1EO0
// login: user

// TODO: creating group
// TODO: deleting chat

function ChatPage() {
  const { user } = useContext<UserState>(UserContext)
  const [client, setClient] = useState<CompatClient | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [foundUsers, setFoundUsers] = useState<FoundUser[]>([]);
  const [isFinding, SetIsFinding] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [notReadChats, setNotReadChats] = useState<Chat[]>([])

  const findUsers = async (username: string) => {
    await ChatService.findUsers(username).then((users) => {
      SetIsFinding(true)
      setFoundUsers(users)
    })
  }

  const getCurrentChat = async (chatId: string) => {
    await ChatService.getChat(chatId).then((currentChat) => {
      setActiveChat(currentChat)
      setMessages(currentChat.messages)
    })
  }

  const check = (m1: Message, m2: Message) => {
    if (m1.fromId == m2.fromId && m1.content == m2.content && m1.timestamp == m2.timestamp) {
      return true
    }
  }

  const getNotReadChats = async (message: Message) => {
    await ChatService.getUserChats().then((chats) => {
      for (const chat of chats) {
        if (chat.messages.filter((m: Message) => check(m, message)).length > 0) {
          console.log("update notReadChats")
          setNotReadChats([...notReadChats, chat])
        }
      }
      setChats(chats)
    })
  }

  const getUserChats = async () => {
    await ChatService.getUserChats().then((chats) => {
      setChats(chats)
    })
  }

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body) as Message;
    console.log(activeChat)
    setMessages([...messages, message])
    
    if (activeChat === null) {
      getNotReadChats(message)
    }
  };

  const createMessage = () => {
    const message = messageInputValue;
    const to = activeChat?.users.length == 2 ? activeChat.users[1].username : null;
    const from = user?.username
    if (from != null && typeof message == "string" && typeof to == "string" && activeChat != null) {
      return {
        chatId: activeChat?.chatId,
        fromId: from,
        content: message,
        timestamp: new Date().toString()
      }
    }
    else {
      throw new Error("check input data!");
    }
  }

  const messageSend = (message: Message) => {
    client?.send(
      '/app/chat',
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      },
      JSON.stringify(message));
    console.log(activeChat)
    if (activeChat != null) {
      setActiveChat(activeChat)
      setMessages([...messages, message])
    }
  }

  useEffect(() => {
    if (!isFinding) {
      getUserChats()
    }
  }, [isFinding])

  useEffect(() => {
    let sock = new SockJS(ChatService.API_URL + '/ws');
    let stompClient = Stomp.over(sock);
    stompClient.connect(
      {},
      () => { stompClient.subscribe(`/user/${user?.username}/queue/messages`, onMessageReceived) },
      (error: any) => { console.log(error) }
    )
    setClient(stompClient)
  }, [])

  const handleKeyPress = (event: any) => {
    if (event.key === "Escape") {
      setActiveChat(null)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  window.onbeforeunload = function (e) {
    setActiveChat(null)
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/4 bg-black p-4">
          <div className="flex flex-row mb-4 mr-2">
            <input
              placeholder="Search users"
              className={isFinding ? "w-4/5 bg-black" : "w-full bg-black"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  findUsers(inputValue)
                }
              }} />
            {isFinding
              ?
              <button className="close-button w-1/5" onClick={() => {
                setInputValue("")
                SetIsFinding(false)
              }}>
                <span>X</span>
              </button>
              :
              <></>
            }
          </div>

          <ul className="chats">
            {isFinding
              ?
              foundUsers?.map((foundUser) => (
                <li key={foundUser.username}>
                  <div
                    onClick={async () => {
                      for (const chat of chats) {
                        if (
                          chat.type == "PERSONAL"
                          && chat.chatName.split("&").filter((name) => name == `${user?.name}`).length != 0
                        ) {
                          getCurrentChat(chat.chatId)
                        }
                      }
                      if (activeChat == null) {
                        await ChatService.createChat({
                          chatName: `${user?.name}&${foundUser.name}`,
                          usernames: [`${user?.name}`, foundUser.username],
                          type: "PERSONAL"
                        }).then((createdChat) => {
                          getCurrentChat(createdChat.chatId)
                        })
                      }
                      setInputValue("")
                      SetIsFinding(false)
                    }
                    }
                    className="flex items-center p-4 bg-black shadow chat"
                  >
                    <div className="w-12 h-12 bg-white rounded-full">
                      {/* <img src={`data:image/png;base64,${""}`} /> */}
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold">{foundUser.username}</h2>
                    </div>
                  </div>
                </li>
              ))
              :
              chats?.map((chat) => (
                <li key={chat.chatId}>
                  <div
                    onClick={() => {
                      setActiveChat(chat)
                      setMessages(chat.messages)

                      const index = notReadChats.indexOf(chat);
                      if (index > -1) {
                        notReadChats.splice(index, 1);
                      }
                    }}
                    style={{ backgroundColor: `${chat.chatId === activeChat?.chatId ? "rgb(107 114 128)" : "transparent"}` }}
                    className="flex items-center p-4 bg-black shadow chat flex-row"
                  >
                    <div className="w-12 h-12 bg-white rounded-full">
                    </div>

                    <div className="ml-5 flex flex-row">
                      <h2 className="text-lg font-semibold text-white">
                        {
                          chat.type == "PERSONAL"
                            ? chat.chatName.split("&").filter(name => name != `${user?.name}`)[0]
                            : chat.chatName
                        }
                      </h2>
                    </div>
                    {notReadChats.includes(chat)
                      ?
                      <div className="flex flex-row justify-end">
                        <div className="ml-5 w-6 h-6 bg-white rounded-full justify-end">
                        </div>
                      </div>
                      : <></>
                    }
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

        {activeChat != undefined
          ?
          <div className="flex-1 flex flex-col bg-black border-l-2">
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-black shadow">
              <div className="w-12 h-12 bg-white rounded-full">
              </div>

              <div className="ml-3">
                <h2 className="text-lg font-semibold text-white">
                  {
                    activeChat?.type == "PERSONAL"
                      ? activeChat?.chatName.split("&").filter(name => name != `${user?.name}`)[0]
                      : activeChat?.chatName
                  }
                </h2>
              </div>
            </div>

            <div className="flex flex-col h-full w-full mx-auto p-4 bg-black chat-box">
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 chat-area">
                {messages.map((message) => (
                  <div
                    key={message.timestamp}
                    className={`flex ${message.fromId === user?.username ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      key={message.timestamp}
                      className={`mb-2 p-2 rounded-lg ${message.fromId === user?.username
                        ? "bg-blue-500 text-white w-1/3"
                        : "bg-gray-200 text-black w-1/3"
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex items-center mt-4 space-x-2">
                <input
                  className="flex-1 bg-black"
                  placeholder="Type your message..."
                  value={messageInputValue}
                  onChange={(e) => setMessageInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      messageSend(createMessage())
                      setMessageInputValue("")
                    }
                  }}
                />
                <button onClick={() => {
                  messageSend(createMessage())
                  setMessageInputValue("")
                }}>Send</button>
              </div>
            </div>
          </div>
          :
          <div className="w-1/4 bg-black p-4"></div>
        }
      </div>
    </div>
  );
}

export default ChatPage;
