import { DbLoadSurveys } from './../../../../../data/usecases/survey/load-surveys/db-load-surveys'
import { LoadSurveysController } from './../../../../../presentation/controllers/survey/load-survey/load-surveys-controller'
import { SurveyMongoRepository } from './../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeLoadSurveysController = (): LoadSurveysController => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveys = new DbLoadSurveys(surveyMongoRepository)
  return new LoadSurveysController(dbLoadSurveys)
}
