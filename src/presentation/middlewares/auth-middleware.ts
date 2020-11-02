import { LoadAccountByToken } from './../../domain/usecases/login/load-account-by-token'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }
    await this.loadAccountByToken.load(accessToken)
  }
}
