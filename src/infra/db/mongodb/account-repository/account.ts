import { AddAccountModel } from './../../../../domain/usecases/add-account-protocols'
import { AccountModel } from './../../../../domain/models/account-protocols'
import { AddAccountRepository } from './../../../../data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AddAccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithOutId } = account
    return { ...accountWithOutId, id: _id }
  }
}
