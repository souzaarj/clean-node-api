import { adapterRoute } from './../adapter/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/login', adapterRoute(makeLoginController()))
}
