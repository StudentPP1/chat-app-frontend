import { CompatClient } from "@stomp/stompjs";
import { DeleteMessageRequest } from "../model/DeleteMessageRequest";
import { UpdateMessageRequest } from "../model/UpdateMessageRequest";
import { SendMessageRequest } from "../model/SendMessageRequest";
import { DEFAULT_CREDENTIALS, DEFAULT_HEADERS } from "../utils/constants";

export default class ClientService {
  client: CompatClient;

  constructor(client: CompatClient) {
    this.client = client;
  }

  deleteMessage(message: DeleteMessageRequest) {
    this.client.send(
      "/app/deleteMessage",
      {
        headers: DEFAULT_HEADERS,
        credentials: DEFAULT_CREDENTIALS,
      },
      JSON.stringify(message)
    );
  }

  updateMessage(message: UpdateMessageRequest) {
    this.client.send(
      "/app/updateMessage",
      {
        headers: DEFAULT_HEADERS,
        credentials: DEFAULT_CREDENTIALS,
      },
      JSON.stringify(message)
    );
  }

  messageSend(message: SendMessageRequest) {
    this.client.send(
      "/app/sendMessage",
      {
        headers: DEFAULT_HEADERS,
        credentials: DEFAULT_CREDENTIALS,
      },
      JSON.stringify(message)
    );
  }
}
