import { makeLoadSurveysController } from './../../factories/controllers/survey/load-survey/load-survey-controller-factory'
export default {
  Query: {
    async surveys (): Promise<any> {
      const controller = makeLoadSurveysController()
      const httpResponse = await controller.handle({})
      return httpResponse.body
    }
  }
}
