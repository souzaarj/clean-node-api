import { serverError } from './../../helpers/http/http-helper'
import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultModel , SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { Validation } from '@/presentation/protocols/validation'

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer'
    }
  }
)

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await Promise.resolve(
        {
          id: 'any_id',
          surveyId: 'any_survey_id',
          accountId: 'any_account_id',
          answer: 'any_answer',
          date: new Date()
        }
      )
    }
  }
  return new SaveSurveyResultStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  validationStub: Validation
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(validationStub, saveSurveyResultStub)
  return {
    sut,
    validationStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer'
    })
  })

  test('Should return 500 if  saveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
