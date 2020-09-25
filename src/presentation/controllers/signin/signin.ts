import { MissingParamError } from './../../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../../protocols/http'
import { Controller } from './../../protocols/controller'
import { badRequest } from '../../helpers/http-helper'

export class SinginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body?.user) {
      return badRequest(new MissingParamError('user'))
    }

    return await Promise.resolve({
      statusCode: 200,
      body: ''
    })
  }
}
