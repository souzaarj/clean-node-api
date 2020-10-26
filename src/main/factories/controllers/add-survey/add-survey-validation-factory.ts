import { RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite'
export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields: string[] = ['question', 'answers']

  fields.forEach(field => validations.push(new RequiredFieldValidation(field)))

  return new ValidationComposite(validations)
}
