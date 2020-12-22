import { Request, Response, NextFunction } from 'express'

export const noCache = (request: Request, response: Response, next: NextFunction): void => {
  response
    .set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    .set('pragma', 'no-cache')
    .set('expires', '0')
    .set('surrogate-control', 'no-store')
  next()
}
