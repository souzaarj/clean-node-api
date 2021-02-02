import { Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers'
import {
  makeDbAuthentication,
  makeSignUpValidation,
  makeDbAddAccount,
  makeLogControllerDecorator
} from '@/main/factories'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
