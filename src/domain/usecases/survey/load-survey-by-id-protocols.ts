import { SurveyModel } from '../../models/survey-protocols'
export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}
