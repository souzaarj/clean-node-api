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

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_surveyId',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50
  },
  {
    answer: 'other_answer',
    image: 'any_image',
    count: 10,
    percent: 80
  }],
  date: new Date()
})
