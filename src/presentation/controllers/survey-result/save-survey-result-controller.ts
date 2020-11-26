import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../login/login/login-controller-protocols'
export class SaveSurveyResultController implements Controller {
  constructor (private readonly validation: Validation) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }
    return null
  }
}
