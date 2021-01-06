import { signUpParamsSchema } from './schemas/signup-params-schema'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components/'
import { errorSchema, loginParamsSchema, accountSchema, surveySchema, surveysSchema, surveyAnswerSchema, apiKeyAuthSchema } from './schemas/'
import { loginPath, surveyPath, signUpPath } from './paths/'

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
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signUpParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden
  }
}
