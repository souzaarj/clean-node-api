import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import {
  Controller,
  LoadSurveyById,
  HttpResponse,
  HttpRequest,
  SaveSurveyResult
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const accountId = httpRequest.accountId
      const survey = await this.loadSurveyById.loadById(surveyId, accountId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
