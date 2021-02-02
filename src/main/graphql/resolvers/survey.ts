import { makeLoadSurveysController } from '@/main/factories'
export default {
  Query: {
    async surveys (): Promise<any> {
      const controller = makeLoadSurveysController()
      const httpResponse = await controller.handle({})
      return httpResponse.body
    }
  }
}
