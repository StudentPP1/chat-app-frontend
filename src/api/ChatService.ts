import { ChatCreateRequest } from "../model/ChatCreateRequest";
import { API_URL, RequestAttributes } from "../utils/constants";

export default class ChatService {
  static async getUserChats() {
    const response = await fetch(
      API_URL + "/get/user/chats",
      await RequestAttributes.builder().build()
    );
    const json = await response.json();
    return json;
  }

  static async findUsers(username: string) {
    const response = await fetch(
      API_URL + "/get/user/" + username,
      await RequestAttributes.builder().build()
    );
    const json = await response.json();
    return json;
  }

  static async getChat(chatId: string) {
    const response = await fetch(
      API_URL + "/get/chat/" + chatId,
      await RequestAttributes.builder().build()
    );
    const json = await response.json();
    return json;
  }

  static async createChat(chat: ChatCreateRequest) {
    const response = await fetch(
      API_URL + "/create/chat",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(JSON.stringify(chat))
        .build()
    );
    const json = await response.json();
    return json;
  }

  static async deleteChat(fromId: string, chatId: string) {
    await fetch(
      API_URL + "/delete/chat/",
      await RequestAttributes.builder()
        .setMethod("DELETE")
        .setBody(
          JSON.stringify({
            chatId: parseInt(chatId),
            fromId: fromId,
          })
        )
        .build()
    );
  }

  static async addUsers(chatId: string, usernames: string[]) {
    await fetch(
      API_URL + "/add/users/",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(
          JSON.stringify({
            chatId: parseInt(chatId),
            usernames: usernames,
          })
        )
        .build()
    );
  }

  static async updateChat(chatId: string, chatName: string) {
    await fetch(
      API_URL + "/update/chat",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(
          JSON.stringify({
            chatId: parseInt(chatId),
            chatName: chatName,
          })
        )
        .build()
    );
  }

  static async updateChatImg(chatId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(
      API_URL + "/update/chat/" + chatId,
      await RequestAttributes.builder()
        .setMethod("POST")
        .defaultHeader()
        .addHeader("Access-Control-Allow-Origin", "*")
        .setBody(formData)
        .build()
    );
  }
}
