import { LoadSurveyById } from './../../../domain/usecases/survey/load-survey-by-id-protocols'
import { serverError } from './../../helpers/http/http-helper'
import { HttpResponse, HttpRequest } from '@/presentation/protocols/http'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Controller } from '@/presentation/protocols/controller'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)

      if (validationError) {
        return badRequest(validationError)
      }

      const { surveyId } = httpRequest.body

      await this.loadSurveyById.loadById(surveyId)

      await this.saveSurveyResult.save(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
