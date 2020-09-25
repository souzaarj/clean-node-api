import { HttpRequest } from './../../protocols/http'
import { SinginController } from './signin'

const makeSut = (): SinginController => {
  return new SinginController()
}

describe('Signin Controller', () => {
  test('Should returns 400 if no user is provide', async () => {
    const sut = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should returns 400 if no password is provide', async () => {
    const sut = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        user: 'any_user'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
