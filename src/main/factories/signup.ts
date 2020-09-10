import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { AddAccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup/signup'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
