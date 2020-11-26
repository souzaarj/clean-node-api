import { SurveyResultModel } from '@/domain/models/survey-result-protocols'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export type SaveSurveyResult = {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
