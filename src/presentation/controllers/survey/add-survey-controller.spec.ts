import { HttpRequest, Controller, Validation } from './add-survey-controller-protocols'
import AddSurveyController from './add-survey-controller'

const makeValidationStub = (): Validation => {
  class ValidationStub {
    validate (): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validationStub: Validation
  sut: Controller
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddSurveyController(validationStub)
  return {
    sut,
    validationStub
  }
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers:
      [{
        image: 'any_image',
        answer: 'any_answer'
      }]
  }
})

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
