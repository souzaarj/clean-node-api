import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeDbLoadAccountByToken } from '@/main/factories'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
