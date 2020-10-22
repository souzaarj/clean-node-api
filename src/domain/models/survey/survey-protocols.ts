export interface SurveyModel {
  id: string
  question: string
  answers: [{image: string, answer: string}]
}
