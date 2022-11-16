import { Router } from 'express'
import { adapterRoute } from '../adapters/express-adapter-route'
import { makeLoadUserByEmailController } from '../factories/controllers/load-user-by-email'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/user/load-by-email/:email', adapterRoute(makeLoadUserByEmailController()))
  router.get('/healthcheck', (req, res) => {
    res.send('OK')
    res.end()
  })
}
