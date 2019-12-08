const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

var cors = require('cors')

//load env vars
dotenv.config({ path: './config/config.env' })

//connect to database
connectDB()

//Route files
const centers = require('./routes/centers')
const courses = require('./routes/courses')
const admin = require('./routes/adminbro')

const app = express()

//body parser
app.use(express.json())
//Dev logging middleware
app.use(morgan('dev'))
//file upload
app.use(fileupload())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//mount routes
app.use('/api/v1/centers', centers)
app.use('/api/v1/courses', courses)
app.use('/admin', admin)

// error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.use(cors())

const server = app.listen(PORT, () =>
	console.log(
		`server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	)
)
//handle unhandled primse rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`error ${err.message}`.red)
	//close server & exitprocess
	server.close(() => process.exit(1))
})
