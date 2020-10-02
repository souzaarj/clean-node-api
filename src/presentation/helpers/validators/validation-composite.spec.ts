import { MissingParamError } from './../../errors/missing-param-error'
import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | undefined {
        return new MissingParamError('field')
      }
    }
    const sut = new ValidationComposite([new ValidationStub()])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
