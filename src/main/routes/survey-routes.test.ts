import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne(
    {
      name: 'Rodrigo',
      email: 'rodrido@email.com',
      password: '123',
      role: 'admin'
    }
  )

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  surveyCollection = await MongoHelper.getCollection('surveys')
  await surveyCollection.deleteMany({})
  accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})

describe('POST /Surveys', () => {
  test('Should return 403 on add survey without accessToken', async () => {
    await request(app)
      .post('/api/surveys')
      .send({
        question: 'Question',
        answers: [{
          image: 'http://image-name.com',
          answer: 'answer 1'
        },
        {
          answer: 'answer 2'
        }]
      })
      .expect(403)
  })

  test('Should return 204 on add survey with valid Token', async () => {
    const accessToken = await makeAccessToken()

    await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          image: 'http://image-name.com',
          answer: 'answer 1'
        },
        {
          answer: 'answer 2'
        }]
      })
      .expect(204)
  })
})

describe('GET /Surveys', () => {
  test('Should return 403 load surveys without accessToken', async () => {
    await request(app)
      .get('/api/surveys')
      .expect(403)
  })

  test('Should return 200 on load surveys with valid accessToken', async () => {
    const accessToken = await makeAccessToken()

    await request(app)
      .get('/api/surveys')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
