import { AccountModel } from '@/domain/models/account-protocols'
import { AddAccountModel } from '@/domain/usecases/account/add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
