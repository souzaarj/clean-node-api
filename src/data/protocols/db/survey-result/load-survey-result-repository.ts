import { SurveyResultModel } from '@/domain/models/survey-result-protocols'

export interface LoadSurveyResultRepository{
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
