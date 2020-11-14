import { serverError, ok } from './../../../helpers/http/http-helper'
import { SurveyModel } from './../../../../domain/models/survey/survey-protocols'
import { LoadSurveys } from './../../../../domain/usecases/survey/load-survey-protocols'
import { LoadSurveysController } from './load-surveys-controller'

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
            ]
    }
  ]
}

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadsSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }
  return new LoadsSurveyStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('Load Survey Controller', () => {
  test('Should call loadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSurveysSpy).toHaveBeenCalled()
  })

  test('Should returns Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.handle({})
    expect(surveys).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 500 if loadSurvey throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
