import { AccountModel } from '@/domain/models/account-protocols'
export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
