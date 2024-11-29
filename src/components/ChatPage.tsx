import { useContext, useState } from 'react';
import SockJS from "sockjs-client"
import { Message } from "../model/Message"
import { Stomp } from '@stomp/stompjs';
import { UserContext, UserState } from '../utils/context';
import { Navbar } from './Navbar';
import { ChatList } from './ChatList';
import { ChatBox } from './ChatBox';
import ChatService from '@/api/ChatService';
import { Chat } from '@/model/Chat';

function ChatPage() {
  const { user } = useContext<UserState>(UserContext)
  const [activeChat, setActiveChat] = useState<Chat | undefined>(undefined);

  const onMessageReceived = (payload: any) => {
    const data = JSON.parse(payload.body);
    console.log(data);
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
  }

  let sock = new SockJS(ChatService.API_URL + '/ws');
  let stompClient = Stomp.over(sock);
  stompClient.connect({}, onConnected, onError);

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <Navbar />
      <div className="flex flex-1">
        <ChatList
          activeChat={activeChat}
          setActiveChat={setActiveChat} />
        {activeChat ?
          <ChatBox
            activeChat={activeChat}
            messageSend={messageSend}
            user={user}
          /> : <div className="w-1/4 bg-black p-4"></div>}
      </div>
    </div>
  );
}

export default ChatPage;
