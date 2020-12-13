import { AddSurveyParams } from './../usecases/survey/add-survey-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers:
            [
              {
                image: 'any_image',
                answer: 'any_survey'
              }
            ],
  date: new Date()
})

export const mockSurveyModels = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers:
            [
              {
                image: 'any_image',
                answer: 'any_survey'
              }
            ],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers:
                [
                  {
                    image: 'other_image',
                    answer: 'other_survey'
                  }
                ],
    date: new Date()
  }
])

export const mockAddSurveyParams = (): AddSurveyParams => (
  {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'other_answer'
    }],
    date: new Date()
  }
)