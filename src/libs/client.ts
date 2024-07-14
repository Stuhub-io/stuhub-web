import { API_BASE_URL } from "@/constants/envs"

type Headers = Record<string, string>

export class Client {
  // Get base URL from .env or fallback to an empty string
  baseUrl: string = API_BASE_URL

  headers: Headers = {
    'Content-Type': 'application/json',
  }

  privateHeaders: Headers = {
    ...this.headers,
    credentials: 'include',
  }

  token = ''

  public setAuthToken(token: string) {
    this.token = token
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${this.token}`,
    }
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers }
    this.token = ''
  }

  public hasAuthToken() {
    return this.token
  }

  public get formDataHeaders(): Headers {
    const cloned = Object.assign({}, this.privateHeaders)
    // Browsers will auto-set Content-Type and other things when formData is used
    // Content-Type must not be present for form data to work
    delete cloned['Content-Type']

    return cloned
  }
}
