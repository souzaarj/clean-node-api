import {
  UpdateAccessTokenRepository,
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  Authentication,
  AuthenticationModel
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

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