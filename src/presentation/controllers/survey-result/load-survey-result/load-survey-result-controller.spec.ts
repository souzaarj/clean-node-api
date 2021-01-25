import { HttpRequest } from '@/presentation/protocols/http'
import { LoadSurveyResultSpy } from './../../../test/mock-survey-result'
import { LoadSurveyByIdSpy } from './../../../test/mock-survey'
import { ServerError, InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyResultController } from './load-survey-result-controller'
import mockdate from 'mockdate'
import faker from 'faker'

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => mockdate.set(new Date()))
  afterAll(() => mockdate.reset())

  type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdSpy: LoadSurveyByIdSpy
    loadSurveyResultSpy: LoadSurveyResultSpy
  }

  const mockRequest = (): HttpRequest => ({
    params: { surveyId: faker.random.uuid() }
  })

  const makeSut = (): SutTypes => {
    const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)
    return {
      sut,
      loadSurveyByIdSpy,
      loadSurveyResultSpy
    }
  }

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveyByIdSpy.id).toBe(httpRequest.params.surveyId)
  })

  test('should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    loadSurveyByIdSpy.surveyModel = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError('')))
  })

  test('should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const HttpRequest = mockRequest()
    await sut.handle(HttpRequest)
    expect(loadSurveyResultSpy.surveyId).toBe(HttpRequest.params.surveyId)
  })

  test('should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError('')))
  })

  test('should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(loadSurveyResultSpy.surveyResultModel))
  })
})
