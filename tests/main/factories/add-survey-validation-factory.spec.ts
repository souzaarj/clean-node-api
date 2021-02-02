import { makeAddSurveyValidation } from '@/main/factories/controllers'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { Validation } from '@/presentation/protocols/validation'
jest.mock('@/validation/validators/validation-composite.ts')

describe('SurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    const fields: string[] = ['question', 'answers']

    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
