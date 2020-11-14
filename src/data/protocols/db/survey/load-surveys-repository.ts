import { SurveyModel } from './../../../../domain/models/survey/survey-protocols'
export interface LoadSurveysRepository {
  load: () => Promise<SurveyModel[]>
}
