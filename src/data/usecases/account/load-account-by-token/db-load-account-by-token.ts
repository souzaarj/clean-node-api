import { LoadAccountByTokenRepository, AccountModel, Decrypter, LoadAccountByToken } from './load-account-by-token-protocols'

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
