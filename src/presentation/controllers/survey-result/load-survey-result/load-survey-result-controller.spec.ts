import { InvalidParamError } from './../../../errors/invalid-param-error'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { mockSurveyModel } from '@/domain/test/mock-survey'
import { SurveyModel } from '../save-survey-result/save-survey-result-protocols'

const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('LoadSurveyResult Controller', () => {
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
})
