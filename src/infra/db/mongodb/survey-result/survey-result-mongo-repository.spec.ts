import { AccountModel } from '@/domain/models/account-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey-protocols'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

let surveyResultCollection: Collection
let accountCollection: Collection
let surveyCollection: Collection

const makeFakeAddSurvey = (): AddSurveyModel => (
  {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }],
    date: new Date()
  }
)

const makeFakeAddAccount = async (): Promise<AccountModel> => {
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const account = await MongoHelper.map(result.ops[0])
  return account
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const result = await surveyCollection.insertOne(makeFakeAddSurvey())
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
    const survey = await makeSurvey()
    const account = await makeFakeAddAccount()
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
})
