import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { surveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
export class DbSaveSurveyResult implements SaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultModel): Promise<surveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
