import { AddSurveyParams } from '@/domain/usecases/survey/add-survey-protocols'
export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
