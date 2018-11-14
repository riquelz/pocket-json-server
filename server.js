const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

//server.use(bodyParser.urlencoded({extended: true}))
//server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

server.post('/auth/login', (req, res) => {
  res.status(200).json(userdb)
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
    next()
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})