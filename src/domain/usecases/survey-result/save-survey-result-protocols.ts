import { surveyResultModel } from '@/domain/models/survey-result-protocols'

export type SaveSurveyResultModel = Omit<surveyResultModel, 'id'>

export type SaveSurveyResult = {
  save: (data: SaveSurveyResultModel) => Promise<surveyResultModel>
}
