import { ChatCreateRequest } from "../model/ChatCreateRequest";

export default class ChatService {
  static API_URL = process.env.REACT_APP_BACKEND_URL;

  static async getUserChats() {
    const response = await fetch(ChatService.API_URL + "/get/user/chats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    return json;
  }

  static async getMessages(chatId: string) {
    const response = await fetch(
      ChatService.API_URL + "/get/messages/" + chatId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  }

  static async findUsers(username: string) {
    const response = await fetch(
      ChatService.API_URL + "/get/user/" + username,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  }

  static async getChat(chatId: string) {
    const response = await fetch(
      ChatService.API_URL + "/get/chat/" + chatId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  }

  static async createChat(chat: ChatCreateRequest) {
    const response = await fetch(
      ChatService.API_URL + "/create/group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
        body: JSON.stringify(chat)
      }
    );
    return response;
  }
}
