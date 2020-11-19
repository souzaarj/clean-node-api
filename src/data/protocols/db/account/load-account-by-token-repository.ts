import { AccountModel } from '@/domain/models/login/account-protocols'
export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
