import { LoadSurveyRepositorySpy } from './../../../test/mock-db-survey'
import mockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveyRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => mockDate.set(new Date()))
  afterAll(() => mockDate.reset())

  test('Should call LoadSurveyRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    await sut.load()
    expect(loadSurveysRepositorySpy.callsCount).toBe(1)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveyModel)
  })

  test('Should throws if LoadSurveyRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load()
    await expect(promise).rejects.toThrowError()
  })
})
