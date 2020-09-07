import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017'
    )
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })

    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrido@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
