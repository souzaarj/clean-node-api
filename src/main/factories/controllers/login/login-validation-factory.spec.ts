import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation
} from '../../../../validation/validators'
import { EmailValidator } from './../../../../validation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'
import { Validation } from '../../../../presentation/protocols'

jest.mock('../../../../validation/validators/validation-composite.ts')

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
