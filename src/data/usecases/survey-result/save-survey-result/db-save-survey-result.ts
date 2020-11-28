import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
export class DbSaveSurveyResult implements SaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository: SurveyResultMongoRepository
  ) { }

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
