import { API_URL, RequestAttributes } from "../utils/constants";

export default class CsrfService {
  static async fetchCsrfToken() {
    const result = await fetch(
      API_URL + "/csrf-token",
      await RequestAttributes.builder().defaultHeader().build()
    );
    const json = await result.json();
    return json;
  }
}
