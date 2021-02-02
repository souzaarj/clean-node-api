import { auth } from './../middlewares/auth'
import { adminAuth } from './../middlewares/admin-auth'
import { makeLoadSurveysController, makeAddSurveyController } from '@/main/factories'
import { adapterRoute } from '../adapter/express-route-adapter'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adapterRoute(makeLoadSurveysController()))
}
