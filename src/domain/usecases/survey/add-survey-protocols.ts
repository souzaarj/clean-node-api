import { SurveyModel } from '@/domain/models/survey-protocols'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export type AddSurvey = {
  add: (data: AddSurveyParams) => Promise<void>
}
