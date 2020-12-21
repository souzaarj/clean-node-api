
import { gql } from 'apollo-server-express'

export default gql`

scalar Date

extend type Query {
  surveys: [Survey]
}

type Survey {
  id: String
  question: String
  answers: [SurveyAnswerModel]
  date: Date
}

type SurveyAnswerModel {
  image: String
  answer: String
}
`
