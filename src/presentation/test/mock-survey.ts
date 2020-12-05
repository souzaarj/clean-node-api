import { mockSurveyModels } from '@/domain/test/'
import { LoadSurveys } from '@/domain/usecases/survey/load-survey-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey-protocols'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return {
        id: 'any_id',
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      }
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadsSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockSurveyModels()
    }
  }
  return new LoadsSurveyStub()
}
