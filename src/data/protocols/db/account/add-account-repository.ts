import { AccountModel } from '../../../../domain/models/login/account-protocols'
import { AddAccountModel } from './../../../../domain/usecases/login/add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
