import { badRequest, unauthorized, serverError, notFound } from './components/'
import { errorSchema, loginParamsSchema, accountSchema } from './schemas/'
import { loginPath } from './paths/'

export default {
  openapi: '3.0.0',
  info:
  {
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre programadores.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    notFound
  }
}
