import { mockLoadSurveyResultRepository, LoadSurveyResultRepository, LoadSurveyResult } from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'

describe('LoadSurveyResult UseCase', () => {
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

  test('should throws if LoadSurveyResultRepository throw', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const surveyId = 'any_survey_id'
    const promise = sut.load(surveyId)
    await expect(promise).rejects.toThrowError()
  })
})
