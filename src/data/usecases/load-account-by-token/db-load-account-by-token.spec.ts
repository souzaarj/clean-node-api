import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './../../protocols/criptography/decrypter'
describe('DBLoadAccountByToken Usecase', () => {
  test('Should call Decrypeter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (tokem: string): Promise<string> {
        return 'any_value'
      }
    }

    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
