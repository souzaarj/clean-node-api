import { EmailValidator } from './../presentetion/protocols/email-validator'
export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
