const express = require('express')
const router = express.Router()
var model = require('../models/')

router.get('/', (req, res) => {
  // res.send('welcome')
  model.Subject.findAll({
    include: model.Teacher,
    order: ['id']
  })
  .then(dataSubjects => {
    res.render('subject', {dataSubjects: dataSubjects})
  })
})

router.get('/add', (req,res) => {

})

module.exports = router
