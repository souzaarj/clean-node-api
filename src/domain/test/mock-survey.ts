import { AddSurveyParams } from './../usecases/survey/add-survey-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'
import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word()
  },
  {
    answer: faker.random.word(),
    image: faker.random.image()
  }],
  date: faker.date.recent()
})

export const mockSurveyModels = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])

export const mockAddSurveyParams = (): AddSurveyParams => (
  {
    question: faker.random.words(),
    answers: [{
      image: faker.random.image(),
      answer: faker.random.word()
    },
    {
      answer: faker.random.word()
    },
    {
      answer: faker.random.word()
    }],
    date: faker.date.recent()
  }
)
