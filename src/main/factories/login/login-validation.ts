import { EmailValidation } from './../../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from './../../../utils/email-validator-adapter'
import { RequiredFieldValidation } from './../../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from './../../../presentation/helpers/validators/validation-composite'
import { Validation } from '../../../presentation/helpers/validators/validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['email', 'password']

  fields.forEach(field => validations.push(new RequiredFieldValidation(field)))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
