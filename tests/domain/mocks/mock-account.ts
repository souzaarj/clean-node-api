import { AuthenticationModel } from '@/domain/models/authentication'
import { AuthenticationParams , AddAccountParams } from '@/domain/usecases'

import { AccountModel } from '@/domain/models/account'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
