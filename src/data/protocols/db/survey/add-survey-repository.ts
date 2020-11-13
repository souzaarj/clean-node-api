import { AddSurveyModel } from './../../../../domain/usecases/survey/add-survey-protocols'
export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
