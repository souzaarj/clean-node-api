import { AccountModel } from './../../../domain/models/account-protocols'
export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
