import { SurveyResultMongoRepository } from '@/infra/db'
import { DbSaveSurveyResult } from '@/data/usecases'
import { SaveSurveyResult } from '@/domain/usecases'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
