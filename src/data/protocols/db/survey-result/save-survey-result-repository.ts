import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result-protocols'
export interface SaveSurveyResultRepository{
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
