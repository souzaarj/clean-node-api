import { MongoHelper } from './../helpers/mongo-helper'

describe('Authentication Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017'
    )
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const authenticationCollection = await MongoHelper.getCollection('authentication')
    await authenticationCollection.deleteMany({})
  })
  test('Should ', () => {

  })
})
