import request from 'supertest'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../config/app'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017'
    )
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on login', async () => {
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

    await request(app)
      .post('/api/login')
      .send({
        email: 'rodrido@email.com',
        password: '123'
      })
      .expect(200)
  })

  test('Should return 401 on login', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })

    await request(app)
      .post('/api/login')
      .send({
        email: 'rodrido@email.com',
        password: '123'
      })
      .expect(401)
  })
})
