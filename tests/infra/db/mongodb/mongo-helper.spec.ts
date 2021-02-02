import { MongoHelper as sut } from '@/infra/db'
describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongo is down', async () => {
    let accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
