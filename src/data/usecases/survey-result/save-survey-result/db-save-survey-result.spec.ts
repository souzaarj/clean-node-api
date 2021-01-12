import { mockSurveyResultModel } from './../../../../domain/test/mock-survey-result'
import { mockLoadSurveyResultRepository } from './../../../test/mock-survey-result'
import { mockSaveSurveyResultParams } from '@/domain/test/'
import { mockSaveSurveyResultRepository } from '@/data/test/mock-survey-result'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResult, SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import mockDate from 'mockdate'
import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  type SutTypes = {
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
    sut: SaveSurveyResult
  }
  const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
    return {
      saveSurveyResultRepositoryStub,
      loadSurveyResultRepositoryStub,
      sut
    }
  }

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(mockSaveSurveyResultParams())
    expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams())
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.save(mockSaveSurveyResultParams())
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams().surveyId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrowError()
  })

  test('Should returns null on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultParams())
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrowError()
  })
})
