import { AccountMongoRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/criptography'
import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
