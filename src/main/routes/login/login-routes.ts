import { makeLoginController } from './../../factories/login/login'
import { adapterRoute } from '../../adapter/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/login', adapterRoute(makeLoginController()))
}
