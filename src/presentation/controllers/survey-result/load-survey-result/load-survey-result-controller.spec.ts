import { mockSurveyResultModel } from '@/domain/test/mock-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result-protocols'
import { mockLoadSurveyById } from '@/presentation/test/mock-survey'
import { ServerError, InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { SurveyResultModel } from '../save-survey-result/save-survey-result-protocols'
import mockdate from 'mockdate'

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => mockdate.set(new Date()))
  afterAll(() => mockdate.reset())

  const mockLoadSurveyResult = (): LoadSurveyResult => {
    class LoadSurveyResultStub implements LoadSurveyResult {
      async load (surveyId: string): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new LoadSurveyResultStub()
  }

  type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    loadSurveyResultStub: LoadSurveyResult
  }
  const makeSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
    return {
      sut,
      loadSurveyByIdStub,
      loadSurveyResultStub
    }
  }

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(loadByIdSpy).toBeCalledWith('any_id')
  })

  test('should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const response = await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const response = await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(response).toEqual(serverError(new ServerError('')))
  })

  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(loadSpy).toBeCalledWith('any_id')
  })

  test('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    jest.spyOn(loadSurveyResultStub, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(response).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: { surveyId: 'any_id' }
    })
    expect(response).toEqual(ok(mockSurveyResultModel()))
  })
})
