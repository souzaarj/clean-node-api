import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from './db-save-survey-result-protocols'
import mockDate from 'mockdate'

const makeFakeSaveSurveyResult = (): SaveSurveyResultModel => (
  {
    surveyId: 'any_survey_Id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
)

const makeFakeSurveyResultData = (): SurveyResultModel => ({ id: 'any_id', ...makeFakeSaveSurveyResult() })

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResultData()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  sut: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    saveSurveyResultRepositoryStub,
    sut
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSaveSurveyResult())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveSurveyResult())
  })

  test('Should returns an SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(makeFakeSaveSurveyResult())
    expect(surveyResult).toEqual(makeFakeSurveyResultData())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(makeFakeSaveSurveyResult())
    await expect(promise).rejects.toThrowError()
  })
})
