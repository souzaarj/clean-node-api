import { makeAuthMiddleware } from '@/main/factories'
import { adapterMiddleware } from '@/main/adapter/express-middleware-adapter'

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
