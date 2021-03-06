import { SurveyMongoRepository } from '../../../infra/db/mongodb/survey-mongo-repository'
import { DbLoadSurveyById } from '@/data/usecases'
import { LoadSurveyById } from '../../../domain/usecases/load-survey-by-id'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
