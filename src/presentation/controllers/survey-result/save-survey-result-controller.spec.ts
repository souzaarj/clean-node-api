import { HttpRequest } from './../../protocols/http'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { Validation } from '@/presentation/protocols/validation'

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      surveyId: 'any_survey_Id',
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

type SutTypes = {
  sut: SaveSurveyResultController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new SaveSurveyResultController(validationStub)
  return {
    sut,
    validationStub
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
})
