const express = require('express')
const router = express.Router()
var model = require('../models/')

router.use((req,res,next) => {
  if (req.session.role == 'headmaster') {
    next()
  }
  else {
    // res.sendStatus(401)
    res.render('index', {session: req.session, err_msg: 'Anda tidak punya akses ke halaman teachers.'})
  }
})

router.get('/', (req, res) => {
  // res.send('welcome')
  model.Teacher.findAll({
    include: model.Subject,
    order: ['id']
  })
  .then(dataTeachers => {
    res.render('teacher', {dataTeachers: dataTeachers})
  })
})

router.get('/add', (req,res) => {
  model.Subject.findAll()
  .then((dataSubjects) => {
    res.render('teacher_add', {dataSubjects: dataSubjects})
  })
})

router.post('/add', (req, res) => {
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    SubjectId: req.body.subject
  })
  .then(() => {
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', (req, res) => {
  model.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', (req, res) => {
  model.Teacher.findById(req.params.id)
  .then(dataTeacher => {
    model.Subject.findAll()
    .then((dataSubjects) => {
      // res.render('teacher_add', {dataSubjects: dataSubjects})
      res.render('teacher_edit', {dataTeacher: dataTeacher, dataSubjects: dataSubjects})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  model.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    updatedAt: new Date,
    SubjectId: req.body.subject
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
})

module.exports = router
