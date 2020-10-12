import { BcryptAdapter } from './../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccountMongoRepository } from './../../../infra/db/mongodb/account-repository/account'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from './../../../infra/criptography/jwt-adapter/jwt-adapter'
import { LogMongoRepository } from './../../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from './../../decorators/logs'
import { makeLoginValidation } from './login-validation'
import { LoginController } from './../../../presentation/controllers/login/login'
import { Controller } from './../../../presentation/protocols/controller'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const Validation = makeLoginValidation()
  const jwtAdapter = new JwtAdapter('is very secret')
  const dbAuthentication = new DbAuthentication(addAccountMongoRepository, bcryptAdapter, jwtAdapter, addAccountMongoRepository)
  const loginController = new LoginController(dbAuthentication, Validation)
  return new LogControllerDecorator(loginController, new LogMongoRepository())
}
