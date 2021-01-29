import { SurveyModel } from '@/domain/models/survey-protocols'
export interface LoadSurveyById {
  loadById: (surveyId: string, accountId: string) => Promise<SurveyModel>
}
