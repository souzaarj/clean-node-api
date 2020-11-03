import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './../../protocols/criptography/decrypter'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (tokem: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}
interface SutTypes{
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DBLoadAccountByToken Usecase', () => {
  test('Should call Decrypeter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
