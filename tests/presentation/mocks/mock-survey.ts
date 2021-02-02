import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { LoadSurveys , LoadSurveyById , AddSurvey, AddSurveyParams } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models/survey'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return null
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  id: string
  surveyModel = mockSurveyModel()

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}
export class LoadSurveysSpy implements LoadSurveys {
  surveyModel = mockSurveyModels()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModel
  }
}
