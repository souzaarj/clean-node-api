import { SurveyResultModel } from '@/domain/models/survey-result-protocols'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
