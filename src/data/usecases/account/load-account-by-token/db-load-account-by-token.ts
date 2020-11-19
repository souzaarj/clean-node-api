import { LoadAccountByTokenRepository, AccountModel, Decrypter } from './load-account-by-token-protocols'
import { LoadAccountByToken } from '@/domain/usecases/login/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) { }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const tokenVerify = await this.decrypter.decrypt(accessToken)
    if (tokenVerify) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)

      if (account) {
        return account
      }
    }
    return null
  }
}
