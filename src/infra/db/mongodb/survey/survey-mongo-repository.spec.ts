import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyCollection: Collection

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  test('Should add survey into survey collection', async () => {
    const sut = new SurveyMongoRepository()
    const fakeSurvey = {
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      },
      {
        answer: 'other_answer'
      }]
    }
    await sut.add(fakeSurvey)
    const surveys = await surveyCollection.findOne({ question: 'any_question' })
    expect(surveys).toBeTruthy()
  })
})
