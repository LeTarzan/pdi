import { Router } from 'express';
import { adapterRoute } from '../adapters/express-adapter-route';
import { makeLoadUserByEmailController } from '../factories/controllers/load-user-by-email';

export default (router: Router) => {
  router.get('/user/load-by-email/:email', adapterRoute(makeLoadUserByEmailController()))
}
