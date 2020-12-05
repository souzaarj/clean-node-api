import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result-protocols'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const surveyResult = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId
      }, {
        $set: {
          answer: data.answer,
          date: data.date
        }
      },
      {
        upsert: true,
        returnOriginal: false
      })

    return surveyResult.value && MongoHelper.map(surveyResult.value)
  }
}
