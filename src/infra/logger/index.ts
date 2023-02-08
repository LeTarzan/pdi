import pino from 'pino'
import rTracer from 'cls-rtracer'
import { env } from '../../main/config/env'
import { NextFunction, Request, Response } from 'express'
import { performance } from 'perf_hooks'

const destination = pino.destination({
  sync: false
})

const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level (level) {
        return { level }
      }
    }
  },
  destination)

const getExtraInfo = (data: any = {}): any => ({
  application_name: 'pdi',
  transaction_id: rTracer.id(),
  enviroment: env.app.NODE_ENV,
  ...data
})

export const logInfo = (message: any): void => {
  logger.info(getExtraInfo(), message)
}

export const logError = (message: any): void => {
  logger.error(getExtraInfo({ stack: message.stack }), message.message)
}

export const logRequest = (request: Request, response: Response, next: NextFunction): void => {
  const start = performance.now()

  response.on('finish', () => {
    const end = performance.now()

    const extras = {
      headers: request.headers,
      method: request.method,
      url: request.url,
      query: request.query,
      params: request.params,
      statusCode: response.statusCode,
      responseTime: (end - start).toFixed(2)
    }

    logger.info(getExtraInfo(extras), 'HTTP Request')
  })

  next()
}
