import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurvey, AddSurveyModel } from '@/domain/usecases/survey/add-survey-protocols'
import mockDate from 'mockdate'

const makeFakeSurvey = (): AddSurveyModel => (
  {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
)

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      return null
    }
  }
  return new AddSurveyRepositoryStub()
}

type SutTypes = {
  addSurveyRepositoryStub: AddSurveyRepository
  sut: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    addSurveyRepositoryStub,
    sut
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => mockDate.set(new Date()))

  afterAll(() => mockDate.reset())

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const fakeSurvey = makeFakeSurvey()
    await sut.add(fakeSurvey)
    expect(addSpy).toHaveBeenCalledWith(fakeSurvey)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeSurvey())
    await expect(promise).rejects.toThrowError()
  })
})
