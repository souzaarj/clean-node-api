import { SurveyAnswerModel } from './../../models/survey/survey-protocols'

export type AddSurveyModel = {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export type AddSurvey = {
  add: (data: AddSurveyModel) => Promise<void>
}
