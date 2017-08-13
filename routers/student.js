const express = require('express')
const router = express.Router()
var model = require('../models/')

router.get('/', (req, res) => {
  model.Student.findAll({
    order: ['id']
  })
  .then(dataStudents => {
    res.render('student', {dataStudents: dataStudents})
  })
})

router.get('/add', (req, res) => {
  res.render('student_add', {err_msg: null})
})

router.post('/add', (req, res) => {
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    full_name: `${req.body.first_name} ${req.body.last_name}`
  })
  .then(() => {
    res.redirect('/students')
  })
  .catch((err) => {
    // console.log(err);
    // res.send(err)
    res.render('student_add', {err_msg: err.errors[0].message})
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

router.get('/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(dataStudent => {
    res.render('student_edit', {dataStudent: dataStudent, err_msg: null})
  })
})

router.post('/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(dataStudent => {
    // res.render('student_edit', {dataStudent: dataStudent})
    model.Student.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      updatedAt: new Date,
      full_name: `${req.body.first_name} ${req.body.last_name}`
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      res.render('student_edit', {dataStudent: dataStudent, err_msg: err.errors[0].message})
    })
  })
})

router.get('/:id/addsubject', (req,res) => {
  model.Student.findById(req.params.id)
  .then(dataStudent => {
    model.Subject.findAll()
    .then(dataSubjects => {
      res.render('student_subject_add', {dataStudent: dataStudent, dataSubjects: dataSubjects})
    })
  })
})

router.post('/:id/addsubject', (req,res) => {
  model.StudentSubject.create({
    SubjectId: req.body.subject,
    StudentId: req.params.id,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  res.redirect('/students')
})

module.exports = router
