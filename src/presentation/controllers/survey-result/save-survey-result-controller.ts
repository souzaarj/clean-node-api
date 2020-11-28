import { forbidden } from './../../helpers/http/http-helper'
import { InvalidParamError } from './../../errors/invalid-param-error'
import {
  Controller,
  Validation,
  LoadSurveyById,
  HttpResponse,
  HttpRequest,
  SaveSurveyResult,
  serverError
} from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.saveSurveyResult.save(httpRequest.body)

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
