import { API_URL, RequestAttributes } from "../utils/constants";

export default class UserService {
  static async getSession() {
    const result = await fetch(
      API_URL + "/auth/getSession",
      await RequestAttributes.builder().build()
    );
    if (result.ok) {
      const json = await result.json();
      return json;
    } else {
      return null;
    }
  }

  static async login(username: string, password: string) {
    const response = await fetch(
      API_URL + "/auth/login",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(JSON.stringify({ username: username, password: password }))
        .build()
    );
    return response;
  }

  static async register(name: string, username: string, password: string) {
    const response = await fetch(
      API_URL + "/auth/register",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(
          JSON.stringify({
            name: name,
            username: username,
            password: password,
          })
        )
        .build()
    );

    return response;
  }

  static async update(name: string, username: string) {
    const response = await fetch(
      API_URL + "/update/user",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody(
          JSON.stringify({
            newName: name,
            newUsername: username,
          })
        )
        .build()
    );
    const json = await response.json();
    return json;
  }

  static async updateUserAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      API_URL + "/update/user/img",
      await RequestAttributes.builder()
        .setMethod("PATCH")
        .defaultHeader()
        .addHeader("Access-Control-Allow-Origin", "*")
        .setBody(formData)
        .build()
    );
    const json = await response.json();
    return json;
  }

  static async getUser(username: string) {
    const response = await fetch(
      API_URL + "/get/user/" + username,
      await RequestAttributes.builder().build()
    );
    const json = await response.json();
    return json;
  }
}
