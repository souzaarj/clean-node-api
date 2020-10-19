import { MongoHelper } from './../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on login', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })
    const password = await hash('123',12)
    await accountCollection.insertOne(
      {
        name: 'Rodrigo',
        email: 'rodrido@email.com',
        password: password,
        passwordConfirmation: '123'
      }
    )

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
