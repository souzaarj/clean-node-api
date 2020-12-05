import { mockAddSurveyParams } from '@/domain/test/mock-survey'
import { mockAddAccountParams } from '@/domain/test/'
import { AccountModel } from '@/domain/models/account-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyResultCollection: Collection
let accountCollection: Collection
let surveyCollection: Collection

const mockAddAccount = async (): Promise<AccountModel> => {
  const result = await accountCollection.insertOne(mockAddAccountParams())
  const account = await MongoHelper.map(result.ops[0])
  return account
}

const mockSurvey = async (): Promise<SurveyModel> => {
  const result = await surveyCollection.insertOne(mockAddSurveyParams())
  const survey = await MongoHelper.map(result.ops[0])
  return survey
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('SurveyResultMongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017')
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await surveyCollection.deleteMany({})
  })

  test('Should add a result if its new', async () => {
    const sut = makeSut()
    const survey = await mockSurvey()
    const account = await mockAddAccount()
    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[0].answer,
      date: new Date()
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toBeTruthy()
    expect(surveyResult.answer).toBe(survey.answers[0].answer)
  })

  test('Should update a result if its not new', async () => {
    const sut = makeSut()
    const survey = await mockSurvey()
    const account = await mockAddAccount()
    const result = await surveyResultCollection.insertOne({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[0].answer,
      date: new Date()
    })

    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[1].answer,
      date: new Date()
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.id).toEqual(result.ops[0]._id)
    expect(surveyResult.answer).toBe(survey.answers[1].answer)
  })
})
