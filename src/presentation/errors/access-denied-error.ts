
export class AccessDeniedError extends Error {
  constructor () {
    const msg = 'Access denied'
    super(msg)
    this.name = 'AccessDeniedError'
  }
}
