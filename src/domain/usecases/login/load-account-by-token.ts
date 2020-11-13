import { AccountModel } from '../../models/login/account-protocols'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}
