const express = require('express')
const {
	getCenters,
	getOneCenters,
	createCenter,
	updateCenter,
	deleteCenter,
	centerPhotoUpload
} = require('../controllers/centers')

const Center = require('../models/Center')
const advancedResults = require('../middleware/advancedResults')

//include other resources routers
const courseRouter = require('./courses')

const router = express.Router()

//reroute into other resource routers
router.use('/:centerId/courses', courseRouter)

router.route('/:id/photo').put(centerPhotoUpload)

router
	.route('/')
	.get(advancedResults(Center, 'courses'), getCenters)
	.post(createCenter)

router
	.route('/:id')
	.get(getOneCenters)
	.put(updateCenter)
	.delete(deleteCenter)

module.exports = router
