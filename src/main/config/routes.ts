import { Express, Router } from 'express'
import { readdirSync } from 'fs'
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`)
    .filter(fileName => !fileName.includes('.test.'))
    .map(async file => (await import(`../routes/${file}`)).default(router))
}
