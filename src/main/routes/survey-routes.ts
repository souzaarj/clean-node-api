import { adapterRoute } from '../adapter/express/express-route-adapter'

import { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router
    .post('/surveys', adapterRoute(makeAddSurveyController()))
}
