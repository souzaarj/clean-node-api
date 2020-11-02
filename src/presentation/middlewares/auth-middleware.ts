import { LoadAccountByToken } from './../../domain/usecases/login/load-account-by-token'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden, success, serverError } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      const account = await this.loadAccountByToken.load(accessToken)

      if (!accessToken || !account) {
        return forbidden(new AccessDeniedError())
      }
      return success({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
