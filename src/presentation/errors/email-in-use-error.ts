
export class EmailInUseError extends Error {
  constructor () {
    const msg = 'The received email is already in use'
    super(msg)
    this.name = 'EmailInUseError'
  }
}
