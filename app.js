const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))



// require routers
var indexRouter = require('./routers/index')
var teacherRouter = require('./routers/teacher')
var subjectRouter = require('./routers/subject')
var studentRouter = require('./routers/student')

app.use('/', indexRouter)
app.use('/teachers', teacherRouter)
app.use('/subjects', subjectRouter)
app.use('/students', studentRouter)



app.listen(3000)
