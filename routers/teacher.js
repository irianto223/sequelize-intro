const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.send('welcome')
  model.Teacher.findAll()
  .then(dataTeachers => {
    res.render('teacher', {dataTeachers: dataTeachers})
  })
})

module.exports = router
