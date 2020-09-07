import { Router } from 'express'

export default (router: Router): void => {
  router
    .post('/signup', async (request, response) => {
      response.send({ ok: 'ok' })
    })
}
