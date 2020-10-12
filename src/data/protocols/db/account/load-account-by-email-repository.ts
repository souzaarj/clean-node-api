import { AccountModel } from '../../../../domain/models/account-protocols'
export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
