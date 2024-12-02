import "../css/ChatPage.css";
import { useContext, useEffect, useState } from 'react';
import SockJS from "sockjs-client"
import { Stomp } from '@stomp/stompjs';
import { UserContext, UserState } from '../utils/context';
import ChatService from '../api/ChatService';
import { Message } from '../model/Message';
import { Chat } from '../model/Chat';
import { FoundUser } from "../model/FoundUser";

// 1.
// password: 1r;0F3Dw1EO[
// login: test

// 2.
// password: 1r;0F3Dw1EO0
// login: user

function ChatPage() {
  const { user } = useContext<UserState>(UserContext)
  const [activeChat, setActiveChat] = useState<Chat | undefined>(undefined);
  const [chats, setChats] = useState<Chat[]>([]);
  const [foundUsers, setFoundUsers] = useState<FoundUser[]>([]);
  const [isFinding, SetIsFinding] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      if (activeChat != null) {
        await ChatService.getMessages(activeChat.chatId).then((chatMessages) => {
          setMessages(chatMessages)
        })
      }
    }
    getMessages()

  }, [])

  useEffect(() => {
    const getChats = async () => {
      await ChatService.getUserChats().then((chats) => {
        setChats(chats)
      })
    }
    if (!isFinding) {
      getChats()
    }
  }, [isFinding])

  const findUsers = async (username: string) => {
    await ChatService.findUsers(username).then((users) => {
      SetIsFinding(true)
      setFoundUsers(users)
    })
  }

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body);
    setMessages([...messages, message])
  };

  const onConnected = () => {
    stompClient.subscribe(`/user/${user?.username}/queue/messages`, onMessageReceived);
  }

  const onError = (error: any) => {
    console.log(error);
  };

  const messageSend = (message: Message) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      credentials: "include"
    };
    stompClient.send('/app/chat', headers, JSON.stringify(message));
    setMessages([...messages, message])
  }

  const createMessage = () => {
    const message = messageInputValue;
    const to = activeChat?.users.length == 2 ? activeChat.users[1].username : null;
    const from = user?.username
    console.log(from, message, to)
    if (from != null && typeof message == "string" && typeof to == "string" && activeChat != null) {
      return {
        chatId: activeChat?.chatId,
        fromId: from,
        toId: to,
        content: message,
        timestamp: new Date().toString()
      }
    }
    else {
      throw new Error();
    }
  }

  let sock = new SockJS(ChatService.API_URL + '/ws');
  let stompClient = Stomp.over(sock);
  stompClient.connect({}, onConnected, onError);

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <div className="flex flex-1">
        <div className="w-1/4 bg-black p-4">
          <div className="flex flex-row mb-4 mr-2">
            <input
              placeholder="Search users"
              className={isFinding ? "w-4/5" : "w-full"}
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
                    onClick={() => {
                      setActiveChat({
                        chatId: `${user?.username}&${foundUser.username}&${Date.now().toString()}`,
                        users: [{ name: `${user?.name}`, username: `${user?.username}` }, { name: foundUser.name, username: foundUser.username }],
                        type: "PERSONAL"
                      })
                    }}
                    className="flex items-center p-4 bg-black shadow chat"
                  >
                    <div className="w-12 h-12 bg-white">
                      <img src={`data:image/png;base64,${""}`} />
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
                    onClick={() => setActiveChat(chat)}
                    style={{ backgroundColor: `${chat.chatId === activeChat?.chatId ? "rgb(107 114 128)" : "transparent"}` }}
                    className="flex items-center p-4 bg-black shadow chat"
                  >
                    <div className="w-12 h-12 bg-white">
                      <img src={`data:image/png;base64,${""}`} />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold">{chat.chatId}</h2>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
        {activeChat ?
          <div className="flex-1 flex flex-col bg-black">
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-black shadow">
              <div className="w-12 h-12 bg-white">
                <img src={`data:image/png;base64,${""}`} />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold">{activeChat.users.length == 2
                  ? activeChat.users[1].name
                  : activeChat.chatId.split("&")[0]
                }
                </h2>
              </div>
            </div>

            <div className="flex flex-col h-full w-full mx-auto p-4 bg-black chat-box">
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 chat-area">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.fromId === user?.username ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      key={index}
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
                    }
                  }}
                />
                <button onClick={() => { messageSend(createMessage()) }}>Send</button>
              </div>
            </div>
          </div>
          : <div className="w-1/4 bg-black p-4"></div>}
      </div>
    </div>
  );
}

export default ChatPage;
