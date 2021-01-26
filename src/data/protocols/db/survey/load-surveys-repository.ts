import { SurveyModel } from '@/domain/models/survey-protocols'
export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<SurveyModel[]>
}
