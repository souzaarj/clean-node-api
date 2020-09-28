import { Authentication } from './../../../domain/usecases/authentication'
import { ServerError } from './../../errors/server-error'
import { serverError, unauthorized } from './../../helpers/http-helper'
import { InvalidParamError } from './../../errors/invalid-param-error'
import { EmailValidator } from './../../protocols/email-validator'
import { HttpRequest } from '../../protocols/http'
import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticationStub = (): Authentication => {
  class AutenticationStub implements Authentication {
    async auth (email: string, passwor: string): Promise<String> {
      return 'any_token'
    }
  }
  return new AutenticationStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)
  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Signin Controller', () => {
  test('Should returns 400 if no user is provide', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should returns 400 if no password is provide', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call EmailValidator with correct e-mail', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidEmailSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(isValidEmailSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should returns 400 if an invalid e-mail is provide', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('e-mail')))
  })

  test('Should return 500 if LoginController throws', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()
    jest.spyOn(sut, 'handle').mockImplementationOnce(async () => serverError(new ServerError('')))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeHttpRequest())
    expect(authSpy).toBeCalledWith('any_email@mail.com', 'any_password')
  })

  test('Shold return 401 if invalid credentials as provide', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce('')
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
