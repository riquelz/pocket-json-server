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

const USERNAME = 'admin'
const PASSWORD = '121314'

server.use(jsonServer.bodyParser)
server.post('/auth/login', (req, res) => {
  if(req.body.username === USERNAME && req.body.password === PASSWORD)
    res.status(200).json(userdb)
  else {
    const status = 401
    const message = 'Error Username or Password'
    res.status(status).json({ status, message })
  }
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
    next()
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})