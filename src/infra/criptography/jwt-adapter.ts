import jwt from 'jsonwebtoken'
import { Encrypter, Decrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string
  ) { }

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<any> {
    const value = await jwt.verify(token, this.secret)
    return value
  }
}
