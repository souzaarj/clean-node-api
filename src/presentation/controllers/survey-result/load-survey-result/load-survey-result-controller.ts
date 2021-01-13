import { ServerError } from '@/presentation/errors/server-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../save-survey-result/save-survey-result-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const result = await this.loadSurveyById.loadById(surveyId)

      if (!result) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      return null
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
