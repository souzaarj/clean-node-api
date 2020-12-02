import { sign } from 'jsonwebtoken'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import { Collection } from 'mongodb'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne(
    {
      name: 'Rodrigo',
      email: 'rodrido@email.com',
      password: '123'
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

describe('PUT /api/surveys/:surveyId/results', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return 403 on save survey result without accesstoken', async () => {
    await request(app)
      .put('/api/surveys/any_id/results')
      .send({
        answer: 'any_answer'
      })
      .expect(403)
  })

  test('Should return 200 on save survey result with valid Token', async () => {
    const res = await surveyCollection.insertOne({
      question: 'Question',
      answers: [{
        answer: 'answer 1',
        image: 'htt://image-name.com'
      }],
      date: new Date()
    })

    const id = res.ops[0]._id
    const accessToken = await makeAccessToken()

    await request(app)
      .put(`/api/surveys/${id}/results`)
      .set('x-access-token', accessToken)
      .send({ answer: 'answer 1' })
      .expect(200)
  })
})
