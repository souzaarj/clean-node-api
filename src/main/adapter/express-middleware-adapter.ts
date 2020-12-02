import { serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Middleware } from '@/presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adapterMiddleware = (middleware: Middleware) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }

    middleware.handle(httpRequest)
      .then(response => {
        if (response.statusCode === 200) {
          Object.assign(req, response.body)
          next()
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
