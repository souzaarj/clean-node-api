import { MongoHelper } from './../helpers/mongo-helper'
import { Authentication } from './../../../../domain/usecases/authentication'
export class DbAuthenticationMongoRepository implements Authentication {
  async auth (email: string, password: string): Promise<String> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const Authentication = await accountCollection.findOne({ email })

    return await Promise.resolve(Authentication)
  }
}
