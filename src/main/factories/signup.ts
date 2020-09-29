import { makeSignUpValidation } from './signup-validation'
import { LogMongoRepository } from './../../infra/db/mongodb/log-repository/log'
import { Controller } from './../../presentation/protocols/controller'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { AddAccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup/signup'
import { LogControllerDecorator } from '../decorators/logs'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
