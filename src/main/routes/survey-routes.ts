import { makeLoadSurveysController } from './../factories/controllers/survey/load-survey/load-survey-controller-factory'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adapterMiddleware } from './../adapter/express-middleware-adapter'
import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory'
import { adapterRoute } from '../adapter/express-route-adapter'

import { Router } from 'express'

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', adapterRoute(makeLoadSurveysController()))
}
