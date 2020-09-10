import { makeSignUpController } from './../factories/signup'
import { adaptRoute } from './../adapter/express-route-adapter'

import { Router } from 'express'
export default (router: Router): void => {
  router
    .post('/signup', adaptRoute(makeSignUpController()))
}
