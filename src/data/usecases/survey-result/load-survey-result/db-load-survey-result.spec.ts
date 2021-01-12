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
  }

  const makeSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    return {
      sut,
      loadSurveyResultRepositoryStub
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

  test('should throws if LoadSurveyResultRepository throw', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const surveyId = 'any_survey_id'
    const promise = sut.load(surveyId)
    await expect(promise).rejects.toThrowError()
  })
})
