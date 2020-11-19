import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse , LoadSurveys, Controller } from './load-survey-controller-protocols'
export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
