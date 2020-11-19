import { SurveyModel } from '@/domain/models/survey/survey-protocols'
export interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
