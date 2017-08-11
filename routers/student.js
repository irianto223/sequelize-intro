const express = require('express')
const router = express.Router()
var model = require('../models/')

router.get('/', (req, res) => {
  model.Student.findAll()
  .then(dataStudents => {
    res.render('student', {dataStudents: dataStudents})
  })
})

router.get('/add', (req, res) => {
  res.render('student_add')
})

router.post('/add', (req, res) => {
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/students')
  })
})

router.get('/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
})

module.exports = router
