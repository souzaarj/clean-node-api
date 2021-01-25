import { LoadSurveysSpy } from './../../../test/mock-survey'
import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadSurveysController } from './load-surveys-controller'
import mockDate from 'mockdate'

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

  test('Should call loadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    await sut.handle({})
    expect(loadSurveysSpy.callsCount).toBe(1)
  })

  test('Should returns 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const surveys = await sut.handle({})
    expect(surveys).toEqual(ok(loadSurveysSpy.surveyModel))
  })

  test('Should returns 204 if returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModel = []
    const surveys = await sut.handle({})
    expect(surveys).toEqual(noContent())
  })

  test('Should return 500 if loadSurvey throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
