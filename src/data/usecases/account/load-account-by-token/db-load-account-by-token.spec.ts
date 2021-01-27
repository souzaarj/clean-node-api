import { LoadAccountByTokenRepositorySpy } from './../../../test/mock-db-account'
import { DecrypterSpy } from './../../../test/mock-criptography'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}

let token: string
let role: string

describe('DBLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.random.uuid()
    role = faker.random.word()
  })

  test('Should call Decrypeter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    const decryptSpy = jest.spyOn(decrypterSpy, 'decrypt')
    await sut.load(token, role)
    expect(decryptSpy).toHaveBeenCalledWith(token)
  })

  test('Should return null if Decrypeter return null', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockResolvedValueOnce(null)
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken')
    await sut.load(token, role)
    expect(loadByTokenSpy).toHaveBeenCalledWith(token, role)
  })

  test('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockResolvedValueOnce(null)
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })

  test('Should throw if Decrypter throws ', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
    const account = await sut.load(token, role)
    await expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws ', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockRejectedValueOnce(new Error())
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrowError()
  })
})
