import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result-protocols'
import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { mockSurveyResultModel } from '@/domain/test/'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel()
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return this.surveyResultModel
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  surveyResultModel = mockSurveyResultModel()

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return this.surveyResultModel
  }
}
