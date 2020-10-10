import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

describe('JWT Adapter', () => {
  test('Should Call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' },'secret')
  })
})
