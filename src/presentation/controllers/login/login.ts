import {
  Controller,
  EmailValidator,
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../controllers/login/login-protocols'
import { serverError, badRequest, unauthorized, success } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'

export class LoginController implements Controller {
  private readonly emailValidator
  private readonly authentication
  private readonly validation

  constructor (emailValidator: EmailValidator, authentication: Authentication, validation: Validation) {
    this.emailValidator = emailValidator
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)

      const parameters = ['email', 'password']

      for (const parameter of parameters) {
        if (!httpRequest.body[parameter]) {
          return badRequest(new MissingParamError('user'))
        }
      }

      const { email, password } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('e-mail'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
