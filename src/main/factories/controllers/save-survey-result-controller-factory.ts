import { SaveSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols/controller'
import {
  makeDbLoadSurveyById,
  makeLogControllerDecorator,
  makeDbSaveSurveyResult
} from '@/main/factories'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
