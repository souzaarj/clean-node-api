import { MongoHelper } from '@/infra/db'
import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository , LoadAccountByTokenRepository } from '@/data/protocols'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  [x: string]: any
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken: token } })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne(
      {
        accessToken: token,
        $or: [{ role }, { role: 'admin' }]
      }
    )
    return account && MongoHelper.map(account)
  }
}
