import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
export interface SaveSurveyResultRepository{
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
