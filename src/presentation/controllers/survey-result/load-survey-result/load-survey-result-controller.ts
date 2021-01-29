import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result-protocols'
import { ServerError } from '@/presentation/errors/server-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../save-survey-result/save-survey-result-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = httpRequest.params
      const result = await this.loadSurveyById.loadById(surveyId, accountId)

      if (!result) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, httpRequest.accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}
