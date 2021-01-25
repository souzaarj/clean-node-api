import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => (
  {
    surveyId: faker.random.uuid(),
    accountId: faker.random.uuid(),
    answer: faker.random.word(),
    date: faker.date.recent()
  }
)

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 1000 })
  },
  {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 1000 })
  }],
  date: faker.date.recent()
})
