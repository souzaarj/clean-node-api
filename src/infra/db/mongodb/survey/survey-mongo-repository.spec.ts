import { mockAddSurveyParams } from '@/domain/test/mock-survey'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import mockDate from 'mockdate'

let surveyCollection: Collection

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository()

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })
  afterAll(async () => {
    mockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  test('Should add survey into survey collection', async () => {
    const sut = makeSut()

    await sut.add(mockAddSurveyParams())
    const surveys = await surveyCollection.findOne({ question: 'any_question' })
    expect(surveys).toBeTruthy()
  })

  test('Should load surveys by id into survey collection', async () => {
    const sut = makeSut()
    await surveyCollection.insertOne(mockAddSurveyParams())
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockAddSurveyParams()),
        expect.objectContaining({ id: expect.anything() })
      ])
    )
  })

  test('Should load empty list', async () => {
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys).toHaveLength(0)
  })

  test('Should load survey by id on surveyResult ', async () => {
    const sut = await makeSut()
    const result = await surveyCollection.insertOne(mockAddSurveyParams())
    const surveyId = result.ops[0]._id
    const survey = await sut.loadById(surveyId)
    expect(survey.id).toBeTruthy()
    expect(survey).toBeTruthy()
  })
})
