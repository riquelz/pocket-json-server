const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const loginSuccess = JSON.parse(fs.readFileSync('./sample/login/success.json', 'UTF-8'))
const loginUsernameError = JSON.parse(fs.readFileSync('./sample/login/username-error.json', 'UTF-8'))
const loginPasswordError = JSON.parse(fs.readFileSync('./sample/login/password-error.json', 'UTF-8'))
const successForgotDb = JSON.parse(fs.readFileSync('./sample/forgotpassword/success.json', 'UTF-8'))
const successReset = JSON.parse(fs.readFileSync('./sample/reset-password/success.json', 'UTF-8'))
const errorReset = JSON.parse(fs.readFileSync('./sample/reset-password/error.json', 'UTF-8'))
const successAnswer = JSON.parse(fs.readFileSync('./sample/security-question/success.json', 'UTF-8'))
const errorAnswer = JSON.parse(fs.readFileSync('./sample/security-question/error.json', 'UTF-8'))
const errorForgotDb = JSON.parse(fs.readFileSync('./sample/forgotpassword/error.json', 'UTF-8'))
const errorSubmitOTP = JSON.parse(fs.readFileSync('./sample/forgotpassword/error-otp.json', 'UTF-8'))
const errorSubmitOTPNull = JSON.parse(fs.readFileSync('./sample/forgotpassword/error-otp-null.json', 'UTF-8'))
const successForgotOtp = JSON.parse(fs.readFileSync('./sample/forgotpassword/success-otp.json', 'UTF-8'))
const getTotalUsersSuccess = JSON.parse(fs.readFileSync('./sample/get-total-users/success.json', 'UTF-8'))
const getUserStatisticSuccess = JSON.parse(fs.readFileSync('./sample/get-user-statistic/success.json', 'UTF-8'))
const getUserStatisticError = JSON.parse(fs.readFileSync('./sample/get-user-statistic/error.json', 'UTF-8'))
const getPendingApprovalSuccess = JSON.parse(fs.readFileSync('./sample/get-pending-approval/success.json', 'UTF-8'))
const getPendingApprovalError = JSON.parse(fs.readFileSync('./sample/get-pending-approval/error.json', 'UTF-8'))
const getMenuSuccess = JSON.parse(fs.readFileSync('./sample/get-menu/success.json', 'UTF-8'))
const getMenuError = JSON.parse(fs.readFileSync('./sample/get-menu/error.json', 'UTF-8'))

//server.use(bodyParser.urlencoded({extended: true}))
//server.use(bodyParser.json())
server.use(jsonServer.defaults());

const USERNAME = 'admin'
let PASSWORD = '121314'

server.use(jsonServer.bodyParser)
server.post('/api/user/login', (req, res) => {
  if (req.body.username === USERNAME) {
    if (req.body.password === PASSWORD)
      res.status(200).json(loginSuccess)
    else
      res.status(200).json(loginPasswordError)
  } else {
    res.status(200).json(loginUsernameError)
  }
   
  
})
server.post('/api/user/get-by-username', (req, res) => {
  if(req.body.username === USERNAME)
    res.status(200).json(successForgotDb)
  else {
    res.status(200).json(errorForgotDb)
  }
})
server.post('/api/user/forgot-password-otp', (req, res) => {
  res.status(200).json(successForgotOtp)
})

server.post('/api/token/resend-otp', (req, res) => {
  res.status(200).json(successForgotOtp);
});

server.post('/api/user/reset-password', (req, res) => {
  if (req.body.password === '123456') {
    res.status(200).json(errorReset);
  } else {
    PASSWORD = req.body.password;
    res.status(200).json(successReset);
  }
});

server.post('/api/user/forgot-password-security-confirm', (req, res) => {
  if (req.body.securityAnswer === 'first') {
    res.status(200).json(successAnswer);
  } else {
    res.status(200).json(errorAnswer);
  }
});


server.post('/api/user/forgot-password-otp-confirm', (req, res) => {
  if (req.body.token === null || req.body.token === undefined || req.body.token === '') {
    res.status(200).json(errorSubmitOTPNull);
  } else if (req.body.token === '123456') {
    res.status(200).json(successForgotOtp);
  } else {
    res.status(200).json(errorSubmitOTP);
  }
});

server.post('/api/user/get-total-users', (req, res) => {
  res.status(200).json(getTotalUsersSuccess)
})
server.post('/api/user/get-user-statistic', (req, res) => {
  res.status(200).json(getUserStatisticSuccess)
})
server.post('/api/user/get-menu-by-username', (req, res) => {
  if (req.body.username === USERNAME){
    res.status(200).json(getMenuSuccess)
  }
  else {
    res.status(200).json(getMenuError)
  }
})
server.post('/api/approval/get-pending-approval', (req, res) => {
  if (req.body.max === '5'){
    res.status(200).json(getPendingApprovalSuccess)
  }
  else {
    res.status(200).json(getPendingApprovalError)
  }
})

// server.use(/^(?!\/user).*$/,  (req, res, next) => {
//     next()
// })

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})