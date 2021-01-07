import {
  addSurveyParamsSchema,
  signUpParamsSchema,
  surveyResultSchema,
  saveSurveyResultParamsSchema,
  errorSchema,
  loginParamsSchema,
  accountSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signUpParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  surveyResult: surveyResultSchema
}
