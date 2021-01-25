import { SaveSurveyResult } from './../../../../domain/usecases/survey-result/save-survey-result-protocols'
import { SaveSurveyResultRepositorySpy, LoadSurveyResultRepositorySpy } from './../../../test/mock-survey-result'
import { mockSaveSurveyResultParams } from '@/domain/test/'
import { DbSaveSurveyResult } from './db-save-survey-result'
import mockDate from 'mockdate'

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  type SutTypes = {
    saveSurveyResultRepositorySpy: SaveSurveyResultRepositorySpy
    loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
    sut: SaveSurveyResult
  }
  const makeSut = (): SutTypes => {
    const saveSurveyResultRepositorySpy = new SaveSurveyResultRepositorySpy()
    const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySpy, loadSurveyResultRepositorySpy)
    return {
      saveSurveyResultRepositorySpy,
      loadSurveyResultRepositorySpy,
      sut
    }
  }

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(saveSurveyResultRepositorySpy.saveSurveyResultParams).toEqual(saveSurveyResultParams)
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(saveSurveyResultParams.surveyId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrowError()
  })

  test('Should returns SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultParams())
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(saveSurveyResultRepositorySpy, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrowError()
  })
})
