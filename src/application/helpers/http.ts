import { HttpResponse } from "../protocols/http"

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

