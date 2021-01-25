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

  test('Should add survey on success', async () => {
    const sut = makeSut()

    await sut.add(mockAddSurveyParams())
    const count = await surveyCollection.countDocuments()
    expect(count).toBe(1)
  })

  test('Should load all surveys on success', async () => {
    const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
    await surveyCollection.insertMany(addSurveyModels)
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(2)
    expect(surveys[0].id).toBeTruthy()
    expect(surveys[0].question).toBe(addSurveyModels[0].question)
    expect(surveys[1].question).toBe(addSurveyModels[1].question)
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
