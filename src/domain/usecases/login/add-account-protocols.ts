import { AccountModel } from './../../models/login/account-protocols'

export type AddAccountModel = Omit<AccountModel, 'id'>

export type AddAccount = {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
