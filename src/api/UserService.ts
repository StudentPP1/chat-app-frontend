export default class UserService {
  static API_URL = process.env.REACT_APP_BACKEND_URL;

  static async getSession() {
    const result = await fetch(UserService.API_URL + "/auth/getSession", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
    });
    if (result.ok) {
      const json = await result.json();
      return json;
    } else {
      return null;
    }
  }

  static async login(username: string, password: string) {
    const response = await fetch(UserService.API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    });
    return response;
  }

  static async register(name: string, username: string, password: string) {
    const response = await fetch(UserService.API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
    });
    return response;
  }

  static async update(name: string, username: string) {
    const response = await fetch(UserService.API_URL + "/update/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        newName: name,
        newUsername: username,
      }),
    });
    const json = await response.json();
    return json;
  }

  static async updateUserAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(UserService.API_URL + "/update/user/img", {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      credentials: "include",
      body: formData,
    });

    const json = await response.json();
    return json;
  }

  static async getUser(username: string) {
    const response = await fetch(
      UserService.API_URL + "/get/user/" + username,
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
}
