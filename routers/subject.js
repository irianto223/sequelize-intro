const express = require('express')
const router = express.Router()
var model = require('../models/')

router.get('/', (req, res) => {
  // res.send('welcome')
  model.Subject.findAll()
  .then(dataSubjects => {
    res.render('subject', {dataSubjects: dataSubjects})
  })
})

module.exports = router
