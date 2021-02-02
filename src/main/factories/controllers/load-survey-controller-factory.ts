import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '@/main/factories'
import { DbLoadSurveys } from '@/data/usecases'
import { LoadSurveysController } from '@/presentation/controllers'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeLoadSurveysController = (): Controller => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveys = new DbLoadSurveys(surveyMongoRepository)
  const controller = new LoadSurveysController(dbLoadSurveys)
  return makeLogControllerDecorator(controller)
}
