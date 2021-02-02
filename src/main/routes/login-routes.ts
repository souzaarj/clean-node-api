import { adapterRoute } from '@/main/adapter/express-route-adapter'
import { makeLoginController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/login', adapterRoute(makeLoginController()))
}
