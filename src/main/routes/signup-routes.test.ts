import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })

    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrido@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
