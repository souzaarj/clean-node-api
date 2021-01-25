import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication-protocols'
import { AccountModel } from '@/domain/models/account-protocols'
import { mockAccountModel } from '@/domain/test/'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account-protocols'
import faker from 'faker'
export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  AddAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.AddAccountParams = account
    return this.accountModel
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  token = faker.random.uuid()

  async auth (authentication: AuthenticationParams): Promise<string> {
    this.authenticationParams = authentication
    return this.token
  }
}
export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return this.accountModel
  }
}
