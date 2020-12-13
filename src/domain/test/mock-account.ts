import { AuthenticationParams } from '@/domain/usecases/account/authentication-protocols'
import { AddAccountParams } from '@/domain/usecases/account/add-account-protocols'
import { AccountModel } from '@/domain/models/account-protocols'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddAccountModel = (): AccountModel => ({ id: 'any_id' , ...mockAddAccountParams() })

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
