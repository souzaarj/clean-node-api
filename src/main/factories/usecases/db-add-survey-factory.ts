import { DbAddSurvey } from '@/data/usecases'
import { SurveyMongoRepository } from '../../../infra/db/mongodb/survey-mongo-repository'
import { AddSurvey } from '../../../domain/usecases/add-survey'
export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}