import { RequiredFieldValidation } from './../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from './../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
