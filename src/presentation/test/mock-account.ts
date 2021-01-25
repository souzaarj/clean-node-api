import { mockAuthenticationModel } from './../../domain/test/mock-account'
import { AuthenticationModel } from '@/domain/models/authentication-protocols'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication-protocols'
import { AccountModel } from '@/domain/models/account-protocols'
import { mockAccountModel } from '@/domain/test/'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account-protocols'
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
  authenticationModel = mockAuthenticationModel()

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authentication
    return this.authenticationModel
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
