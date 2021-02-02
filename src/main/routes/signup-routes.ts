import { adapterRoute } from '../adapter/express-route-adapter'
import { makeSignUpController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/signup', adapterRoute(makeSignUpController()))
}
