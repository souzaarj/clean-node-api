import { LoadAccountByToken } from './../../domain/usecases/login/load-account-by-token'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden, success } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    const account = await this.loadAccountByToken.load(accessToken)

    if (!accessToken || !account) {
      return forbidden(new AccessDeniedError())
    }
    return success({ accountId: account.id })
  }
}
