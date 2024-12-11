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
    return json;
  }

  static async getChat(chatId: string) {
    const response = await fetch(ChatService.API_URL + "/get/chat/" + chatId, {
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
    return json;
  }

  static async createChat(chat: ChatCreateRequest) {
    const response = await fetch(ChatService.API_URL + "/create/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify(chat),
    });
    const json = await response.json();
    return json;
  }

  static async deleteChat(fromId: string, chatId: string) {
    await fetch(ChatService.API_URL + "/delete/chat/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        chatId: parseInt(chatId),
        fromId: fromId,
      }),
    });
  }

  static async addUsers(chatId: string, usernames: string[]) {
    await fetch(ChatService.API_URL + "/add/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        chatId: parseInt(chatId),
        usernames: usernames,
      }),
    });
  }

  static async updateChat(chatId: string, chatName: string) {
    await fetch(ChatService.API_URL + "/update/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        chatId: parseInt(chatId),
        chatName: chatName,
      }),
    });
  }

  static async updateChatImg(chatId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
  
    await fetch(ChatService.API_URL + "/update/chat/" + chatId, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: formData
    });
  }
}
