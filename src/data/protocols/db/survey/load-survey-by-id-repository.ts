import { SurveyModel } from '@/domain/models/survey-protocols'

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}
