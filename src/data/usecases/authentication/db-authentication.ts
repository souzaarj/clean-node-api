import { TokenGenerator } from './../../protocols/criptography/token-generator'
import { HashComparer } from './../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository
  private readonly hashComparer
  private readonly tokenGenerator
  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<String> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    )
    if (account) {
      await this.hashComparer.compare(
        authentication.password,
        account.password
      )
      await this.tokenGenerator.generate(account.id)
    }

    return null
  }
}