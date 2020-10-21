import { Controller, HttpRequest, HttpResponse } from './add-survey-controller-protocols'

export default class AddSurveyController implements Controller {
  constructor (
    private readonly validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // const validationError =
    this.validation.validate(httpRequest.body)
    return await Promise.resolve(null)
  }
}
