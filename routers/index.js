const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.send('welcome')
  res.render('index')
})

module.exports = router
