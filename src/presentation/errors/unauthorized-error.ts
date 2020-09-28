export class UnauthorizedError extends Error {
  constructor () {
    super('Usuário ou senha inválido(s)!')
    this.name = 'UnauthorizedError'
  }
}
