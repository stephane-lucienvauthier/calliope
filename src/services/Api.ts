import User from '../models/User'

class Api {
  uri?: string = process.env.REACT_APP_API_URI

  getHeaders(isauthenticate: boolean, hasBody: boolean, hasContent: boolean): Headers {
    const headers: Headers = new Headers()
    let connectedUser: string | null = localStorage.getItem('user')

    if (isauthenticate && connectedUser != null) {
      const user: User = JSON.parse(connectedUser)
      headers.append('Authorization', `Token ${user.token}`)
    }

    if (hasBody) {
      headers.append('Content-Type', 'application/json')
    }

    if (hasContent) {
      headers.append('Accept', 'application/json')
    }
    return headers
  }

  async getResponse(response: any, expected: number): Promise<any> {
    if (response.status === expected) {
      return await response.json()
    }
    return false
  }

  async post(resource: string, body: any): Promise<any> {
    const response: any = await fetch(`${this.uri}/${resource}`, { method: 'POST', headers: this.getHeaders(false, true, true), body: JSON.stringify(body) })
    return this.getResponse(response, 200)
  }
}

export class LoginApi extends Api {
  async authenticate(username: string, password: string): Promise<User> {
    return await this.post('login/', {username: username, password: password})
  }
}