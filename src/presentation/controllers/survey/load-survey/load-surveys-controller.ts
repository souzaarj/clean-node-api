import { serverError, ok } from './../../../helpers/http/http-helper'
import { LoadSurveys } from './../../../../domain/usecases/survey/load-survey-protocols'
import { HttpRequest, HttpResponse } from '../../../protocols'
import { Controller } from '../../../protocols/controller'
export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return ok(await this.loadSurveys.load())
    } catch (error) {
      return serverError(error)
    }
  }
}
