import { mockLoadSurveyByIdRepository } from '@/data/test/'
import { LoadSurveyByIdRepository } from './../../../protocols/db/survey/load-survey-by-id-repository'
import mockDate from 'mockdate'
import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { mockLoadSurveyResultRepository, LoadSurveyResultRepository, LoadSurveyResult } from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'

describe('LoadSurveyResult UseCase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  type SutTypes = {
    sut: LoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  }

  const makeSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
    return {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub
    }
  }

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyId = 'any_survey_id'
    await sut.load(surveyId)
    expect(loadBySurveyIdSpy).toBeCalledWith(surveyId)
  })

  test('should returns an SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyId = 'any_survey_id'
    const surveyResult = await sut.load(surveyId)
    await expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('should call loadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockResolvedValue(null)

    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValue(null)
    await sut.load('any_survey_id')
    await expect(loadByIdSpy).toHaveBeenLastCalledWith('any_survey_id')
  })

  test('should throws if LoadSurveyResultRepository throw', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const surveyId = 'any_survey_id'
    const promise = sut.load(surveyId)
    await expect(promise).rejects.toThrowError()
  })
})
