import { Request, Response } from 'express'
import { Controller } from '../../application/protocols/controller'
import { HttpRequest } from '../../application/protocols/http'

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params
    }

    const httpResponse = await controller.handle(httpRequest)
    const statusCode = httpResponse.statusCode

    if (statusCode >= 200 && statusCode <= 299) {
      res.status(statusCode).json(httpResponse.body)
    } else {
      res.status(statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
