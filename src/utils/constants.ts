import CsrfService from "../api/CsrfService";

export const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
export const DEFAULT_CREDENTIALS: RequestCredentials = "include";

export class RequestAttributes {
  private method: string = "GET";
  private headers: Record<string, string> = DEFAULT_HEADERS;
  private credentials: RequestCredentials = DEFAULT_CREDENTIALS;
  private body?: string = undefined;

  static builder(): RequestAttributes {
    return new RequestAttributes();
  }

  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  defaultHeader() {
    this.headers = {};
    return this;
  }

  addHeader(key: string, value: string): this {
    if (!this.headers) {
      this.headers = {};
    }
    this.headers[key] = value;
    return this;
  }

  setCsrfToken(token: string): this {
    if (!this.headers) {
      this.headers = {};
    }
    this.headers["X-XSRF-TOKEN"] = token;
    return this;
  }

  setBody(data: any): this {
    this.body = data;
    return this;
  }
  
  build = async () => {
    if (this.method != "GET") {
      const result = await CsrfService.fetchCsrfToken();
      this.addHeader("X-XSRF-TOKEN", result.token);
    }
    if (this.body) {
      return {
        method: this.method,
        headers: this.headers,
        credentials: this.credentials,
        body: this.body,
      };
    } else {
      return {
        method: this.method,
        headers: this.headers,
        credentials: this.credentials,
      };
    }
  };
}
