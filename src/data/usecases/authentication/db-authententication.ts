import { LoadAccountByEmailRepository } from './../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from './../../../domain/usecases/authentication'
export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<String> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
