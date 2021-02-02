import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { ServerError } from '@/presentation/errors/server-error'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { forbidden, serverError, ok } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'

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
