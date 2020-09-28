import { Authentication } from './../../../domain/usecases/authentication'
import { serverError } from './../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { MissingParamError } from '../../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controller'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
  private readonly emailValidator
  private readonly authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const token = this.authentication.auth(email, password)

      return await Promise.resolve({
        statusCode: 200,
        body: token
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
