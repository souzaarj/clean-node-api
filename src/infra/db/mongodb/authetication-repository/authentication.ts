import { MongoHelper } from './../helpers/mongo-helper'
import { Authentication } from './../../../../domain/usecases/authentication'
import { AuthenticationModel } from '../../../../domain/usecases/authentication'
export class DbAuthenticationMongoRepository implements Authentication {
  async auth (authentication: AuthenticationModel): Promise<String> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const email = authentication.email
    const Authentication = await accountCollection.findOne({ email })

    return await Promise.resolve(Authentication)
  }
}
