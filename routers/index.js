const express = require('express')
const router = express.Router()

var model = require('../models/')

const session = require('express-session')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

router.get('/', (req, res) => {
  res.render('index', {session: req.session, err_msg: null})
})

router.get('/login', (req, res) => {
  res.render('login', {err_msg: null})
})

router.post('/login', (req, res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then(dataUser => {
    req.session.username = dataUser.username
    req.session.role = dataUser.role
    res.redirect('/')
  })
  .catch(err => {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>.', err);
    res.render('login', {err_msg: 'Login gagal.'})
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
