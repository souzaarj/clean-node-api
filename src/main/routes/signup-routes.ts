import { adapterRoute } from '../adapter/express/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'

import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/signup', adapterRoute(makeSignUpController()))
}
