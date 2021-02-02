import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import {
  makeLogControllerDecorator,
  makeLoginValidation,
  makeDbAuthentication
} from '@/main/factories'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
