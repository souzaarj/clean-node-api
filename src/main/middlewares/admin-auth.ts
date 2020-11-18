import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory'
import { adapterMiddleware } from './../adapter/express-middleware-adapter'

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
