import { AddAccountModel } from './../../../../domain/usecases/add-account-protocols'
import { AccountModel } from './../../../../domain/models/account-protocols'
import { AddAccountRepository } from './../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddAccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
