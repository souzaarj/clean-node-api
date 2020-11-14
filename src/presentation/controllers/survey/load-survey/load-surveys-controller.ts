import { serverError } from './../../../helpers/http/http-helper'
import { LoadSurveys } from './../../../../domain/usecases/survey/load-survey-protocols'
import { HttpRequest, HttpResponse } from '../../../protocols'
import { Controller } from '../../../protocols/controller'
export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveys.load()
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
