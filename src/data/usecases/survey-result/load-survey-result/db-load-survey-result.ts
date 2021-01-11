import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result-protocols'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResultRepository } from './../../../protocols/db/survey-result/load-survey-result-repository'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
