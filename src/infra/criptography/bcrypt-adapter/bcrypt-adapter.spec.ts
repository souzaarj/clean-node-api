import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise < string > {
    return await Promise.resolve('hash_value')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
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
  test('Should call hash with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toBeCalledWith('any_value', salt)
  })

  test('Should return a valid hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash_value')
  })

  test('Shoud throw if BcryptAdapter throws', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toBeCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare success', async () => {
    const { sut } = makeSut()
    const hash = await sut.compare('any_value', 'any_hash')
    expect(hash).toBeTruthy()
  })

  test('Should returns false when compare fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBeFalsy()
  })

  test('should returns throw if compare throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrowError()
  })
})
