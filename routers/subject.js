const express = require('express')
const router = express.Router()
var model = require('../models/')
var toLetter = require('../helpers/numToLetter')

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
  .then(data => {
    data.forEach(d => {
      d.Letter = toLetter(d.score)
      // console.log(d.Score);
    })
    res.render('subject_enrolled_students', {dataSS: data, pageTitle: 'enrolled student', session: req.session})
  })
})

router.get('/:id/givescore', (req,res) => {
  model.StudentSubject.findById(req.params.id)
  .then(data => {
    res.render('give_score', {dataSS: data, pageTitle: 'assign score', session: req.session})
  })
})

router.post('/:id/givescore', (req,res) => {
  model.StudentSubject.update({
    score: req.body.nilai
  },
  {
    include: {all: true},
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect(`/subjects/${req.body.idSubject}/enrolledstudents`)
  })
})

module.exports = router
