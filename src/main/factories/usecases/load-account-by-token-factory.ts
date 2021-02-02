import { JwtAdapter } from '@/infra/criptography'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { DbLoadAccountByToken } from '@/data/usecases'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
