import { setupApolloServer } from './apollo-server'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import setupStaticFile from './static-files'
import setupSwagger from './config-swagger'
import express from 'express'

const app = express()
setupStaticFile(app)
setupSwagger(app)
setupMiddleware(app)
setupApolloServer(app)
setupRoutes(app)
export default app
