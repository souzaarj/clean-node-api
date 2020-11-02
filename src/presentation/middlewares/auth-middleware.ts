import { LoadAccountByToken, HttpRequest, HttpResponse, Middleware } from './auth-middleware-protocols'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden, success, serverError } from './../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      const account = await this.loadAccountByToken.load(accessToken, this.role)

      if (!accessToken || !account) {
        return forbidden(new AccessDeniedError())
      }
      return success({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
