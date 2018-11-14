const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const loginSuccess = JSON.parse(fs.readFileSync('./sample/login/success.json', 'UTF-8'))
const loginError = JSON.parse(fs.readFileSync('./sample/login/error.json', 'UTF-8'))
const successForgotDb = JSON.parse(fs.readFileSync('./sample/forgotpassword/success.json', 'UTF-8'))
const errorForgotDb = JSON.parse(fs.readFileSync('./sample/forgotpassword/error.json', 'UTF-8'))

//server.use(bodyParser.urlencoded({extended: true}))
//server.use(bodyParser.json())
server.use(jsonServer.defaults());

const USERNAME = 'admin'
const PASSWORD = '121314'

server.use(jsonServer.bodyParser)
server.post('/api/user/login', (req, res) => {
  if(req.body.username === USERNAME && req.body.password === PASSWORD)
    res.status(200).json(loginSuccess)
  else {
    res.status(200).json(loginError)
  }
})

server.post('/api/user/get-by-username', (req, res) => {
  if(req.body.username === USERNAME)
    res.status(200).json(successForgotDb)
  else {
    res.status(200).json(errorForgotDb)
  }
})

server.use(/^(?!\/user).*$/,  (req, res, next) => {
    next()
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})