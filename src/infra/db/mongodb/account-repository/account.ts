import { LoadAccountByEmailRepository } from './../../../../data/protocols/db/load-account-by-email-repository'
import { AddAccountModel } from './../../../../domain/usecases/add-account-protocols'
import { AccountModel } from './../../../../domain/models/account-protocols'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddAccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  [x: string]: any
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
