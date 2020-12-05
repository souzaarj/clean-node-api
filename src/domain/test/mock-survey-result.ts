import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => (
  {
    surveyId: 'any_survey_Id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
)

export const mockSurveyResultModel = (): SurveyResultModel => ({ id: 'any_id', ...mockSaveSurveyResultParams() })
