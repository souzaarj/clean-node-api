import { adapterRoute } from './../adapter/express-route-adapter'
import { Router } from 'express'
import { auth } from './../middlewares/auth'
import {
  makeLoadSurveyResultController,
  makeSaveSurveyResultController
} from '@/main/factories'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adapterRoute(makeLoadSurveyResultController()))
}
