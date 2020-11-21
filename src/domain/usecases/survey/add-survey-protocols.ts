import { SurveyModel } from '@/domain/models/survey/survey-protocols'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export type AddSurvey = {
  add: (data: AddSurveyModel) => Promise<void>
}
