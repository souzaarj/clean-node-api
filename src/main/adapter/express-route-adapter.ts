import { serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return (req: Request, res: Response): void => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    controller.handle(httpRequest)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          res.status(response.statusCode).json(response.body)
        } else {
          res.status(response.statusCode).json(
            {
              error: response.body.message
            }
          )
        }
      })
      .catch(error => res.status(500).json(serverError(error)))
  }
}
