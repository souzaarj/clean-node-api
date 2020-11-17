import { LoadSurveysRepository } from './../../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'
import { SurveyModel } from './../../../../domain/models/survey/survey-protocols'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers:
            [
              {
                image: 'any_image',
                answer: 'any_survey'
              }
            ],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers:
            [
              {
                image: 'other_image',
                answer: 'other_survey'
              }
            ],
      date: new Date()
    }
  ]
}

const makeLoadSurveyRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveyRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }
  return new LoadSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveyRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveyRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })
})
