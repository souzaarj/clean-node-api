import { SurveyModel } from '../../models/survey-protocols'
export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}
