import express from './services/express'
import api from './api'
import http from 'http'

const app = express('/api', api)
const ip = 'localhost'
const port = '3000'

const server = http.createServer(app)

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d', ip, port)
    })
})
