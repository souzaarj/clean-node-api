import mockDate from 'mockdate'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey-protocols'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

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

    await sut.add(makeFakeAddSurvey())
    const surveys = await surveyCollection.findOne({ question: 'any_question' })
    expect(surveys).toBeTruthy()
  })

  test('Should load surveys into survey collection', async () => {
    const sut = makeSut()
    await surveyCollection.insertOne(makeFakeAddSurvey())
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(
      expect.arrayContaining([
        expect.objectContaining(makeFakeAddSurvey())
      ])
    )
  })

  test('Should load surveys by id into survey collection', async () => {
    const sut = makeSut()
    await surveyCollection.insertOne(makeFakeAddSurvey())
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(
      expect.arrayContaining([
        expect.objectContaining(makeFakeAddSurvey())
      ])
    )
  })

  test('Should load empty list', async () => {
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys).toHaveLength(0)
  })
})
