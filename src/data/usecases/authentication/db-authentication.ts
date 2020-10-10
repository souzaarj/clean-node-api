import {
  UpdateAccessTokenRepository,
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  Authentication,
  AuthenticationModel
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository
  private readonly hashComparer
  private readonly encrypter
  private readonly updateAccessTokenRepository
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<String> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    )
    if (account) {
      const isHashValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      )
      if (isHashValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
