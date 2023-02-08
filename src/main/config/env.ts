/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
const env = {
  app: {
    APPLICATION_NAME: process.env.APPLICATION_NAME || 'pdi',
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  redis: {
    HOST: process.env.REDIS_HOST || 'redis',
    PORT: parseInt(process.env.REDIS_PORT || '6379', 10)
  },
  postgres: {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'pdi_test'
  }
}

export {
  env
}
