import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { adapterMiddleware } from '@/main/adapter/express-middleware-adapter'

export const auth = adapterMiddleware(makeAuthMiddleware())
