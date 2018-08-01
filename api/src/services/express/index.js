import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

export default (apiRoot, routes) => {
  const app = express()

  app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  return app
}
