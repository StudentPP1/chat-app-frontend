import { CompatClient } from "@stomp/stompjs";
import { DeleteMessageRequest } from "../model/DeleteMessageRequest";
import { UpdateMessageRequest } from "../model/UpdateMessageRequest";
import { SendMessageRequest } from "../model/SendMessageRequest";

export default class ClientService {
  client: CompatClient;

  constructor(client: CompatClient) {
    this.client = client;
  }

  deleteMessage(message: DeleteMessageRequest) {
    console.log("message send to delete: ");
    console.dir(message);
    this.client.send(
      "/app/deleteMessage",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      },
      JSON.stringify(message)
    );
  }

  updateMessage(message: UpdateMessageRequest) {
    console.log("message send to update: ");
    console.dir(message);
    this.client.send(
      "/app/updateMessage",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      },
      JSON.stringify(message)
    );
  }

  messageSend(message: SendMessageRequest) {
    console.log("message sending: ");
    console.dir(message);
    this.client.send(
      "/app/sendMessage",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        credentials: "include",
      },
      JSON.stringify(message)
    );
  }
}
