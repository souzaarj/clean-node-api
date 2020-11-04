import { adapterRoute } from '../adapter/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/signup', adapterRoute(makeSignUpController()))
}
