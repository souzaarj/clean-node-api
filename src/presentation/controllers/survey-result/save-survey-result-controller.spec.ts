import mockDate from 'mockdate'
import { forbidden } from './../../helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { SaveSurveyResultController } from './save-survey-result-controller'
import {
  Validation,
  LoadSurveyById,
  HttpRequest,
  SaveSurveyResultModel,
  SaveSurveyResult,
  serverError,
  SurveyResultModel,
  SurveyModel
} from './save-survey-result-protocols'

const makeFakeRequest = (): HttpRequest => (
  {
    params: {
      surveyId: 'any_survey_id'
    },
    body: {
      answer: 'any_answer'
    },
    accountId: 'any_account_id'
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

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return {
        id: 'any_id',
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      }
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await Promise.resolve(
        {
          id: 'valid_id',
          surveyId: 'valid_survey_id',
          accountId: 'valid_account_id',
          answer: 'valid_answer',
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
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(validationStub, loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    validationStub,
    saveSurveyResultStub,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => mockDate.set(new Date()))
  afterAll(() => mockDate.reset())

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if  saveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'wrong_answer'
      },
      accountId: 'any_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer',
      date: new Date()
    })
  })
})
