import { HttpResponse, HttpRequest } from './../../presentation/protocols/http'
import { Controller } from './../../presentation/protocols/controller'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await this.controller.handle(httpRequest)
  }
}
