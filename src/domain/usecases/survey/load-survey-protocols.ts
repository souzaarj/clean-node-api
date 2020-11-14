import { SurveyModel } from './../../models/survey/survey-protocols'
export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
