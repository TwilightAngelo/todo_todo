const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')
const debug = require('debug')('app')

let app = express()

app.use(cors())

mongoose.connect(config.mongoConnectionString)
mongoose.connection.on('error', () => {
	debug('DB connectoin error')
})
mongoose.connection.once('open', (callback) => {
	debug('DB connection estabilished')
})

app.use(bodyParser.json())
app.use('/', require('./routes/groups.js'))
app.use('/tasks', require('./routes/tasks.js'))

app.listen(config.port, () => {
	debug('Im online')
})
