import { serverError, ok } from './../../../helpers/http/http-helper'
import { HttpRequest, HttpResponse , LoadSurveys, Controller } from './load-survey-controller-protocols'
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
