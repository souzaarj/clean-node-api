import { SaveSurveyResult } from './../../../../domain/usecases/survey-result/save-survey-result-protocols'
import { SurveyResultModel } from './../../../../domain/models/survey-result-protocols'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'
export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
