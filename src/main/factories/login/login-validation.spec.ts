import { EmailValidator } from './../../../presentation/protocols/email-validator'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { makeLoginValidation } from './login-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from './../../../presentation/helpers/validators/validation-composite'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'

jest.mock('./../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call validation with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    const fields: string[] = ['email', 'password']

    fields.forEach(field => validations.push(new RequiredFieldValidation(field)))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
