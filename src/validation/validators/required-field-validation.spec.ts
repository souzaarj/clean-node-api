import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from './../../presentation/errors/missing-param-error'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const fakeSurvey = {
      question: 'any_question',
      answers:
        [{
          image: 'any_image',
          answer: 'any_answer'
        }]
    }
    const error = sut.validate(fakeSurvey)
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
