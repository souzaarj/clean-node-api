import { CompareFieldsValidation } from './../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from './../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from './../../presentation/helpers/validators/validation-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

  // for (const field of fields) {
  //   validations.push(new RequiredFieldValidation(field))
  // }

  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
