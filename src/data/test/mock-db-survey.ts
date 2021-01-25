import { mockSurveyModel } from '@/domain/test/mock-survey'
import { mockSurveyModels } from './../../domain/test/mock-survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey-protocols'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  AddSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.AddSurveyParams = data
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  id: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

export class LoadSurveyRepositorySpy implements LoadSurveysRepository {
  surveyModel = mockSurveyModels()
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveyModel
  }
}
