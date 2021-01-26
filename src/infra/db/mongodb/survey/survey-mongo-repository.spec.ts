import { AccountModel } from '@/domain/models/account-protocols'
import { mockAddAccountParams } from '@/domain/test/mock-account'
import { mockAddSurveyParams } from '@/domain/test/mock-survey'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import mockDate from 'mockdate'

let surveyResultCollection: Collection
let accountCollection: Collection
let surveyCollection: Collection

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return MongoHelper.map(res.ops[0])
}

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

    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')

    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await surveyCollection.deleteMany({})
  })

  test('Should add survey on success', async () => {
    const sut = makeSut()

    await sut.add(mockAddSurveyParams())
    const count = await surveyCollection.countDocuments()
    expect(count).toBe(1)
  })

  test('Should load all surveys on success', async () => {
    const account = await mockAccount()
    const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
    const result = await surveyCollection.insertMany(addSurveyModels)
    const survey = result.ops[0]
    await surveyResultCollection.insertOne({
      surveyId: survey._id,
      accountId: account.id,
      answer: survey.answers[0].answer,
      date: new Date()
    })
    const sut = makeSut()
    const surveys = await sut.loadAll(account.id)
    expect(surveys.length).toBe(2)
    expect(surveys[0].id).toBeTruthy()
    expect(surveys[0].question).toBe(addSurveyModels[0].question)
    expect(surveys[0].didAnswer).toBe(true)
    expect(surveys[1].question).toBe(addSurveyModels[1].question)
    expect(surveys[1].didAnswer).toBe(false)
  })

  test('Should load empty list', async () => {
    const sut = makeSut()
    const account = await mockAccount()

    const surveys = await sut.loadAll(account.id)
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
