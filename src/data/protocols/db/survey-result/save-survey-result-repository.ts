import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
export interface SaveSurveyResultRepository{
  save: (data: SaveSurveyResultParams) => Promise<void>
}
