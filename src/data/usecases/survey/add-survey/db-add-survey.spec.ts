import { mockAddSurveyParams } from './../../../../domain/test/mock-survey'
import { mockAddSurveyRepositoryStub } from '@/data/test/'
import { DbAddSurvey } from './db-add-survey'
import { AddSurvey, AddSurveyRepository } from './db-add-survey.protocols'
import mockDate from 'mockdate'

type SutTypes = {
  addSurveyRepositoryStub: AddSurveyRepository
  sut: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    addSurveyRepositoryStub,
    sut
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const fakeSurvey = mockAddSurveyParams()
    await sut.add(fakeSurvey)
    expect(addSpy).toHaveBeenCalledWith(fakeSurvey)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrowError()
  })
})
