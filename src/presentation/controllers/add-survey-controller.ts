import { AddSurvey } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '@/presentation/protocols'

export default class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({ question, answers: answers, date: new Date() })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
