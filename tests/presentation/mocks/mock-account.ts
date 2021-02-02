import { mockAuthenticationModel } from '../../domain/mocks/mock-account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { LoadAccountByToken , Authentication, AuthenticationParams , AddAccount, AddAccountParams } from '@/domain/usecases'

import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/../tests/domain/mocks'

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
