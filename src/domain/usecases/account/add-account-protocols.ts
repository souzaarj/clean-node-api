import { AccountModel } from '../../models/account-protocols'

export type AddAccountParams = Omit<AccountModel, 'id'>

export type AddAccount = {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
