const express = require('express')
const router = express.Router()
var model = require('../models/')

router.use((req,res,next) => {
  if (req.session.role == 'academic' || req.session.role == 'headmaster') {
    next()
  }
  else {
    // res.sendStatus(401)
    res.render('index', {session: req.session, err_msg: 'Anda tidak punya akses ke halaman subjects.', pageTitle: 'welcome page'})
  }
})

router.get('/', (req, res) => {
  // res.send('welcome')
  model.Subject.findAll({
    include: model.Teacher,
    order: ['id']
  })
  .then(dataSubjects => {
    res.render('subject', {dataSubjects: dataSubjects, pageTitle: 'subject page', session: req.session})
  })
})

router.get('/:id/enrolledstudents', (req,res) => {
  model.StudentSubject.findAll({
    include: {all: true},
    where: {SubjectId: req.params.id}
  })
  .then(dataStudentSubjects => {
    dataStudentSubjects.forEach(StudentSubject => {
      // StudentSubject.Letter = toLetter(StudentSubject.score)
      res.render('subject_enrolled_students', {dataStudentSubjects: dataStudentSubjects, pageTitle: 'enrolled students', session: req.session})
    })
  })
})

module.exports = router
