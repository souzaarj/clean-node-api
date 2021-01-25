import { LoadSurveyByIdRepositorySpy } from './../../../test/mock-db-survey'
import { LoadSurveyResultRepositorySpy } from './../../../test/mock-survey-result'
import { LoadSurveyResult } from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'
import faker from 'faker'
import mockDate from 'mockdate'

let surveyId: string

describe('LoadSurveyResult UseCase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  beforeEach(() => { surveyId = faker.random.uuid() })

  type SutTypes = {
    sut: LoadSurveyResult
    loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
    loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
  }

  const makeSut = (): SutTypes => {
    const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
    const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)
    return {
      sut,
      loadSurveyResultRepositorySpy,
      loadSurveyByIdRepositorySpy
    }
  }

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load(surveyId)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId)
  })

  test('should returns an SurveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load(surveyId)
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })

  test('should call loadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    await sut.load(surveyId)
    await expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('should return surveyResultModel with all answers with  count 0 if  LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    const surveyResult = await sut.load(surveyId)
    const { surveyModel } = loadSurveyByIdRepositorySpy
    expect(surveyResult).toEqual({
      surveyId: surveyModel.id,
      question: surveyModel.question,
      date: surveyModel.date,
      answers: surveyModel.answers.map(answer => Object.assign({}, answer, { count: 0, percent: 0 }))
    })
  })

  test('should throws if LoadSurveyResultRepository throw', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.load(surveyId)
    await expect(promise).rejects.toThrowError()
  })
})
