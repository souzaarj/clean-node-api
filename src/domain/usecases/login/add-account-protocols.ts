import { AccountModel } from './../../models/login/account-protocols'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export type AddAccount = {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
