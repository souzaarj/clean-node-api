import { LoadSurveysSpy } from '@/tests/presentation/mocks/mock-survey'
import { HttpRequest } from '@/presentation/protocols/http'
import { serverError, ok, noContent } from '@/presentation/helpers/http-helper'
import { LoadSurveysController } from '@/presentation/controllers'
import mockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ accountId: faker.random.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => mockDate.set(new Date()))
  afterAll(() => mockDate.reset())

  test('Should call loadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveysSpy.accountId).toBe(httpRequest.accountId)
  })

  test('Should returns 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const surveys = await sut.handle(mockRequest())
    expect(surveys).toEqual(ok(loadSurveysSpy.surveyModel))
  })

  test('Should returns 204 if returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModel = []
    const surveys = await sut.handle(mockRequest())
    expect(surveys).toEqual(noContent())
  })

  test('Should return 500 if loadSurvey throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
