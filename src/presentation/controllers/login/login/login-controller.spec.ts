import { mockAuthenticationParams } from './../../../../domain/test/mock-account'
import { ValidationSpy } from './../../../../validation/test/mock-validation'
import { AuthenticationSpy } from '@/presentation/test/mock-account'
import { LoginController } from './login-controller'
import { ok, serverError, badRequest, unauthorized } from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { HttpRequest } from './login-controller-protocols'

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(
    authenticationSpy,
    validationSpy
  )
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

const mockRequest = (): HttpRequest => ({
  body: mockAuthenticationParams()
})

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authenticationParams).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 401 if invalid credentials as provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.authenticationModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(async () => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error('')))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.authenticationModel))
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    jest
      .spyOn(validationSpy, 'validate')
      .mockImplementationOnce(() => new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field'))
    )
  })
})
