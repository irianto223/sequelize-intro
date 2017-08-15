const express = require('express')
const router = express.Router()
const randomSecret = require('../helpers/randomSecret')
const encrypt = require('../helpers/encrypt')

var model = require('../models/')

const session = require('express-session')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

router.get('/', (req, res) => {
  res.render('index', {session: req.session, err_msg: null, pageTitle: 'welcome page'})
})

router.get('/login', (req, res) => {
  res.render('login', {err_msg: null, pageTitle: 'login page'})
})

// router.post('/login', (req, res) => {
//   model.User.findOne({
//     where: {
//       username: req.body.username,
//       password: req.body.password
//     }
//   })
//   .then(dataUser => {
//     req.session.username = dataUser.username
//     req.session.role = dataUser.role
//     res.redirect('/')
//   })
//   .catch(err => {
//     // console.log('>>>>>>>>>>>>>>>>>>>>>>.', err);
//     res.render('login', {err_msg: 'Login gagal.'})
//   })
// })

router.post('/login', (req,res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
    }
  })
  .then(data => {
    model.User.findOne({
      where: {
        password: encrypt(data.secret, req.body.password)
      }
    })
    .then(dataUser => {
      req.session.username = dataUser.username
      req.session.password = dataUser.password
      req.session.role = dataUser.role
      res.redirect('/')
    })
    .catch(err => {
      // res.send('username atau password salah')
      res.render('login', {err_msg: 'Password salah.', pageTitle: 'login page'})
    })
  })
  .catch(err2 => {
    res.render('login', {err_msg: 'Username tidak ada.', pageTitle: 'login page'})
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register', {pageTitle: 'registration', err_msg: null})
})

router.post('/register', (req, res) => {
  model.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    secret: randomSecret(),
    // secret: req.body.secret,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    // res.render('register', {pageTitle: 'registration', err_msg: err})
    res.render('register', {pageTitle: 'registration', err_msg: err.errors[0].message})
  })
})

module.exports = router
