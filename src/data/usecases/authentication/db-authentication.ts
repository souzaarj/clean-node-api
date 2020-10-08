import {
  UpdateAccessTokenRepository,
  TokenGenerator,
  HashComparer,
  LoadAccountByEmailRepository,
  Authentication,
  AuthenticationModel
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository
  private readonly hashComparer
  private readonly tokenGenerator
  private readonly updateAccessTokenRepository
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<String> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    )
    if (account) {
      const isHashValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      )
      if (isHashValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
