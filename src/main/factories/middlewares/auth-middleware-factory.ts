import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols/middleware'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const loadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(loadAccountByToken, role)
}
