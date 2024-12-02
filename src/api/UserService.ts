export default class UserService {
  static API_URL = process.env.REACT_APP_BACKEND_URL;

  static async getSession() {
    const result = await fetch(UserService.API_URL + "/auth/getSession", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
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
        "Access-Control-Allow-Origin": "http://localhost:3000",
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
}
