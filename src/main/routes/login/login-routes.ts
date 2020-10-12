import { makeLoginController } from '../../factories/login/login-factory'
import { adapterRoute } from '../../adapter/express/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/login', adapterRoute(makeLoginController()))
}
