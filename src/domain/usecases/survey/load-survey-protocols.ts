import { SurveyModel } from '../../models/survey-protocols'
export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
