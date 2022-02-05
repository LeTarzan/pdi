const generatePath = (path) => {
  return `${process.env.NODE_ENV === 'development' ? 'src' : 'dist' }/${path}.{js,ts}`
}

module.exports = {
  type: 'postgres',
  synchronize: true,
  logging: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    generatePath('/infra/postgres/entities/index')
  ]
}
