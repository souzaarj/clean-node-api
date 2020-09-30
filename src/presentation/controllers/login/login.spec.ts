import { Validation } from './../../helpers/validators/validation'
import { success } from './../../helpers/http-helper'
import { Authentication } from '../../../domain/usecases/authentication'
import { ServerError } from '../../errors/server-error'
import { serverError, badRequest, unauthorized } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest } from '../../protocols/http'
import { LoginController } from './login'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<String> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(
    emailValidatorStub,
    authenticationStub,
    validationStub
  )
  return {
    sut,
    emailValidatorStub,
    authenticationStub,
    validationStub
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
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

  test('Should return 401 if invalid credentials as provide', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce('')
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid credentials are provide', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
