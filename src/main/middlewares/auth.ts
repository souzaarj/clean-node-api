import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory'
import { adapterMiddleware } from './../adapter/express-middleware-adapter'

export const auth = adapterMiddleware(makeAuthMiddleware())
