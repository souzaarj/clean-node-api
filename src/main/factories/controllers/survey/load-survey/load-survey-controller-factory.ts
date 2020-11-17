import { Controller } from './../../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from './../../../decorators/log-controller-decorator-factory'
import { DbLoadSurveys } from './../../../../../data/usecases/survey/load-surveys/db-load-surveys'
import { LoadSurveysController } from './../../../../../presentation/controllers/survey/load-survey/load-surveys-controller'
import { SurveyMongoRepository } from './../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeLoadSurveysController = (): Controller => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveys = new DbLoadSurveys(surveyMongoRepository)
  const controller = new LoadSurveysController(dbLoadSurveys)
  return makeLogControllerDecorator(controller)
}
