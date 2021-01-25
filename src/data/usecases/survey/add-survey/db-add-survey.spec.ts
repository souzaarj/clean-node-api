import { AddSurveyRepositorySpy } from './../../../test/mock-db-survey'
import { mockAddSurveyParams } from '@/domain/test/mock-survey'
import { DbAddSurvey } from './db-add-survey'
import { AddSurvey, AddSurveyRepository } from './db-add-survey.protocols'
import mockDate from 'mockdate'

type SutTypes = {
  addSurveyRepositorySpy: AddSurveyRepository
  sut: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    addSurveyRepositorySpy,
    sut
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositorySpy, 'add')
    const fakeSurvey = mockAddSurveyParams()
    await sut.add(fakeSurvey)
    expect(addSpy).toHaveBeenCalledWith(fakeSurvey)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrowError()
  })
})
