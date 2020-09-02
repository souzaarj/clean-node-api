import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise < string > {
    return await Promise.resolve('hash_value')
  }
}))

interface sutType {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): sutType => {
  const salt = 12
  return {
    sut: new BcryptAdapter(salt),
    salt: salt
  }
}

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash_value')
  })
})
