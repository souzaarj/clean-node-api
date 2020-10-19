import {
  EmailValidation,
  RequiredFieldValidation,
  CompareFieldsValidation,
  ValidationComposite
} from '../../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../adapter/validators/email-validator-adapter'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
