import { auth } from './../middlewares/auth'
import { adminAuth } from './../middlewares/admin-auth'
import { makeLoadSurveysController } from './../factories/controllers/survey/load-survey/load-survey-controller-factory'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adapterRoute } from '../adapter/express-route-adapter'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adapterRoute(makeLoadSurveysController()))
}
