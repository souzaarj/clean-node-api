import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'

describe('PUT /api/surveys/:surveyId/results', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })
  afterAll(async () => await MongoHelper.disconnect())
  test('should return 403 on save survey result without accesstoken', async () => {
    await request(app)
      .put('/api/surveys/any_id/results')
      .send({
        answer: 'any_answer'
      })
      .expect(403)
  })
})
