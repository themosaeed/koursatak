const express = require('express')
const {
	getCenters,
	getOneCenters,
	createCenter,
	updateCenter,
	deleteCenter
} = require('../controllers/centers')

//include other resources routers
const courseRouter = require('./courses')

const router = express.Router()

//reroute into other resource routers
router.use('/:centerId/courses', courseRouter)

router
	.route('/')
	.get(getCenters)
	.post(createCenter)

router
	.route('/:id')
	.get(getOneCenters)
	.put(updateCenter)
	.delete(deleteCenter)

module.exports = router
