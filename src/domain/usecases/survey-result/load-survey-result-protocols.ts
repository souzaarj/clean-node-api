import { SurveyResultModel } from '@/domain/models/survey-result-protocols'

export type LoadSurveyResult = {
  load: (surveyId: string, accountId) => Promise<SurveyResultModel>
}
