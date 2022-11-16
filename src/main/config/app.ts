import { setupRoutes } from './routes'
import express from 'express'
import rTracer from 'cls-rtracer'
import { logRequest } from '../../infra/logger'

const app = express()

app.use(rTracer.expressMiddleware())
app.use(logRequest)

setupRoutes(app)

export { app }
