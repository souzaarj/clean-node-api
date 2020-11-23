import { surveyResultModel } from './../../../../domain/models/survey-result-protocols'
import { SaveSurveyResultModel } from './../../../../domain/usecases/survey/save-survey-result-protocols'
export interface SaveSurveyResultRepository{
  save: (data: SaveSurveyResultModel) => Promise<surveyResultModel>
}
