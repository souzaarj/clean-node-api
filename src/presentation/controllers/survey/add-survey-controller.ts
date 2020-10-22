import { badRequest } from './../../helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  AddSurvey
} from './add-survey-controller-protocols'

export default class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body)
    if (validationError) {
      return badRequest(validationError)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({ question, answers })
    return await Promise.resolve(null)
  }
}
