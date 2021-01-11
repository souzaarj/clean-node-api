import { LoadSurveyResultRepository } from './../protocols/db/survey-result/load-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
