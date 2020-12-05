import { mockSurveyModels } from '@/domain/test/'
import { mockLoadSurveys } from '@/presentation/test/'
import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadSurveys } from './load-survey-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'
import mockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => mockDate.set(new Date()))
  afterAll(() => mockDate.reset())

  test('Should call loadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSurveysSpy).toHaveBeenCalled()
  })

  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.handle({})
    expect(surveys).toEqual(ok(mockSurveyModels()))
  })

  test('Should returns 204 if returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce([])
    const surveys = await sut.handle({})
    expect(surveys).toEqual(noContent())
  })

  test('Should return 500 if loadSurvey throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
