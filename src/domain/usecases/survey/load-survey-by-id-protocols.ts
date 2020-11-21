import { SurveyModel } from '@/domain/models/survey-protocols'
export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}