import { makeSavaSurveyResultController } from './../factories/controllers/survey-result/save-survey-result-controller-factory'
import { adapterRoute } from './../adapter/express-route-adapter'
import { Router } from 'express'
import { auth } from './../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterRoute(makeSavaSurveyResultController()))
}
