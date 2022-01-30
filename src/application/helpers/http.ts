import { ServerError } from "../errors/server-error"
import { HttpResponse } from "../protocols/http"

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

