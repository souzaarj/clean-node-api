import { HttpRequest } from '../../../presentation/protocols/http'
import { Controller } from '../../../presentation/protocols/controller'
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode < 300) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(
        {
          error: httpResponse.body.message
        }
      )
    }
  }
}
