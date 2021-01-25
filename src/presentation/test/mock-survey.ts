import { mockSurveyModel } from './../../domain/test/mock-survey'
import { mockSurveyModels } from '@/domain/test/'
import { LoadSurveys } from '@/domain/usecases/survey/load-survey-protocols'
import { SurveyModel } from '@/domain/models/survey-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id-protocols'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey-protocols'

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
  callsCount =0

  async load (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveyModel
  }
}
