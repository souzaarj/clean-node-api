import { Validation } from '../../presentation/helpers/validators/validation'
import { RequiredFieldValidation } from './../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from './../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('./../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const fields: string[] = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]

    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})