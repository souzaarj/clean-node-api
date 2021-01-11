import { SurveyResultModel } from '@/domain/models/survey-result-protocols'

export type LoadSurveyResult = {
  load: (surveyId: string) => Promise<SurveyResultModel>
}
