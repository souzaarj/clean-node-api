import { AccountModel } from '../../models/account-protocols'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}
