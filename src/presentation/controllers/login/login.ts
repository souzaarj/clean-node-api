import { badRequest , serverError, unauthorized, success } from '../../helpers/http/http-helper'
import {
  Controller,
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../controllers/login/login-protocols'

export class LoginController implements Controller {
  private readonly authentication
  private readonly validation

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
