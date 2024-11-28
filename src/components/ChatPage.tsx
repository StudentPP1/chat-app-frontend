import { useContext, useState  } from 'react';
import SockJS from "sockjs-client"
import {Message} from "../model/Message"
import { Stomp } from '@stomp/stompjs';
import { UserContext, UserState } from '../utils/context';
import { Navbar } from './Navbar';
import { ChatList } from './ChatList';
import { ChatBox } from './ChatBox';

function ChatPage() {
  // const { user } = useContext<UserState>(UserContext)
  // const [activeChat, setActiveChat] = useState();
  
  // const onMessageReceived = (payload: any) => {
  //   const data = JSON.parse(payload.body);
  //   console.log(data);
  // };

  // const onConnected = () => {
  //   stompClient.subscribe(`/user/${user?.username}/queue/messages`, onMessageReceived);
  // }

  // const onError = (error: any) => {
  //   console.log(error);
  // };

  // const createMessage = (event: any) => {
  //   const message = event.target["message"].value;
  //   const to = event.target["username"].value;
  //   const from = user?.username
  //   if (from != null && typeof message == "string" && typeof to == "string") {
  //     return {
  //       chatId: from + "&" + to + "&" + Date.now().toString(),
  //       fromId: from,
  //       toId: to,
  //       content: message,
  //       timestamp: new Date().toString()
  //     }
  //   }
  //   else {
  //     throw new Error();
  //   }
  // }

  // const messageSend = (message: Message) => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "*",
  //     "Access-Control-Allow-Headers": "*",
  //     credentials: "include"
  //   };
  //   stompClient.send('/app/chat', headers, JSON.stringify(message));
  // }

  // let sock = new SockJS('http://localhost:8080/ws');
  // let stompClient = Stomp.over(sock);
  // stompClient.connect({}, onConnected, onError);

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <Navbar />
      <div className="flex flex-1">
        <ChatList />
        <ChatBox />
      </div>
    </div>
    // <div className="chat-page">
    //   <div>
    //     <form onSubmit={(event) => {
    //       event.preventDefault()
    //       messageSend(createMessage(event))
    //     }}>
    //       <div className="form__group field">
    //         <input
    //           type="input"
    //           className="form__field"
    //           name="username" id='username' required
    //         />
    //         <label
    //           className="form__label"
    //         >
    //           to
    //         </label>
    //       </div>

    //       <div className="form__group field">
    //         <input
    //           type="input"
    //           className="form__field"
    //           name="message" id='message' required
    //         />
    //         <label
    //           className="form__label"
    //         >
    //           message
    //         </label>
    //       </div>

    //       <div className='submit-button'>
    //         <button type="submit">
    //           send
    //         </button>
    //       </div>

    //     </form>
    //   </div>
    // </div>
  );
}

export default ChatPage;
