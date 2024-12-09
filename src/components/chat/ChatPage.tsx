import "../../css/ChatPage.css";
import { useContext, useEffect, useState } from 'react';
import SockJS from "sockjs-client"
import { Stomp } from '@stomp/stompjs';
import ChatService from '../../api/ChatService';
import { Message } from '../../model/Message';
import { Chat } from '../../model/Chat';
import { UserContext, UserState } from "../../utils/context";
import ClientService from "../../api/ClientService";
import { ChatComponent } from "./ChatComponent";
import { ChatList } from "./ChatList";

function ChatPage() {
  const { user, setUser } = useContext<UserState>(UserContext)
  const [client, setClient] = useState<ClientService | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notReadChats, setNotReadChats] = useState<Chat[]>([])
  const [newMessage, setNewMessage] = useState<any>(null)

  const getUserChats = async () => {
    await ChatService.getUserChats().then((chats: Chat[]) => {
      console.log("get chats: ")
      console.dir(chats)

      setChats(chats)

      if (activeChat != null) {
        setActiveChat(null)
        for (const chat of chats) {
          if (chat.chatId === activeChat.chatId) {
            getCurrentChat(chat.chatId)
          }
        }
      }
    })
  }

  const getCurrentChat = async (chatId: string) => {
    await ChatService.getChat(chatId).then((currentChat) => {
      setMessages(currentChat.messages)
      setActiveChat(currentChat)

      console.log("get chat: ")
      console.dir(currentChat)
      console.log("get messages: ")
      console.dir(currentChat.messages)
    })
  }

  const getNotReadChats = async (message: Message) => {
    await ChatService.getUserChats().then((chats) => {
      for (const chat of chats) {
        if (chat.chatId === message.chatId) {
          setNotReadChats([...notReadChats, chat])
        }
      }
      setChats(chats)
    })
  }

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body) as Message;
    setNewMessage(message)
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Escape") {
      setActiveChat(null)
      setMessages([])
    }
  }

  window.onbeforeunload = function (e) {
    setActiveChat(null)
    setMessages([])
  };
  window.addEventListener(`contextmenu`, (e) => e.preventDefault());

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    let sock = new SockJS(ChatService.API_URL + '/ws');
    let stompClient = Stomp.over(sock);
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe(`/user/${user?.username}/queue/messages`, onMessageReceived)
      },
      (error: any) => { console.log(error) }
    )
    setClient(new ClientService(stompClient))
  }, [])

  useEffect(() => {
    if (newMessage != null) {
      console.log("get message: ")
      console.dir(newMessage)

      getUserChats()

      if (newMessage.type === "UPDATE" && activeChat != null) {
        getCurrentChat(newMessage.chatId)
      }

      if (newMessage.type === "SENT" && activeChat === null) {
        getNotReadChats(newMessage)
      }

      setNewMessage(null)
    }
  }, [newMessage])

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <div className="flex flex-1">
        <ChatList
          user={user}
          setUser={setUser}
          activeChat={activeChat}
          setMessages={setMessages}
          setActiveChat={setActiveChat}
          chats={chats}
          notReadChats={notReadChats}
          getUserChats={getUserChats}
        />

        {activeChat && client != null
          ?
          <ChatComponent
            setChats={setChats}
            user={user}
            activeChat={activeChat}
            messages={messages}
            client={client}
            setActiveChat={setActiveChat}
          />
          :
          <div className="w-1/4 bg-black p-4"></div>
        }
      </div>
    </div>
  );
}

export default ChatPage;
