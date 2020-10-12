import { makeSignUpController } from './../../factories/signup/signup'
import { adapterRoute } from './../../adapter/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/signup', adapterRoute(makeSignUpController()))
}
