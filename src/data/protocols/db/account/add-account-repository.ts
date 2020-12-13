import { AccountModel } from '@/domain/models/account-protocols'
import { AddAccountParams } from '@/domain/usecases/account/add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
