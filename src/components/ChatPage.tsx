import React, { useContext, useEffect, useState } from 'react';
import "../scss/ChatPage.css"
import SockJS from "sockjs-client"
import { CompatClient, Stomp } from '@stomp/stompjs';
import { UserContext, UserState } from '../utils/context';

function ChatPage() {
  const { user, setUser } = useContext<UserState>(UserContext)

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

  let sock = new SockJS('http://localhost:8080/ws');
  let stompClient = Stomp.over(sock);
  stompClient.connect({}, onConnected, onError);

  const createMessage = (event: any) => {
    const message = event.target["message"].value;
    const to = event.target["username"].value;
    const from = user?.username
    if (from != null && typeof message == "string" && typeof to == "string") {
      return {
        chatId: from + "&" + to + "&" + Date.now().toString(),
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

  return (
    <div className="chat-page">
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          messageSend(createMessage(event))
        }}>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              name="username" id='username' required
            />
            <label
              className="form__label"
            >
              to
            </label>
          </div>

          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              name="message" id='message' required
            />
            <label
              className="form__label"
            >
              message
            </label>
          </div>

          <div className='submit-button'>
            <button type="submit">
              send
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ChatPage;
