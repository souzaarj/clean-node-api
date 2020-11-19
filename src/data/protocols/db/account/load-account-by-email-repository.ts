import { AccountModel } from '@/domain/models/login/account-protocols'
export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
