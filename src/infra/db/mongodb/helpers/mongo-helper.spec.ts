import { MongoHelper as sut } from './mongo-helper'
describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })

  afterAll(async done => {
    await sut.disconnect()
    done()
  })

  test('Should reconnect if mongo is down', async () => {
    let accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
