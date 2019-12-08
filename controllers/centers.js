const path = require('path')
const Center = require('../models/Center')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc  GET all Centers
// @router GET /api/v1/centers
// @access public
exports.getCenters = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults)
})

// @desc  GET center
// @router GET /api/v1/centers/:id
// @access public
exports.getOneCenters = asyncHandler(async (req, res, next) => {
	const center = await Center.findById(req.params.id)

	if (!center) {
		return next(
			new errorResponse(`Center not Found with id of${req.params.id}`, 404)
		)
	}

	res.status(200).json({
		success: true,
		data: center
	})
})

// @desc  POST center
// @router POST /api/v1/centers/:id
// @access private
exports.createCenter = asyncHandler(async (req, res, next) => {
	const center = await Center.create(req.body)
	res.status(201).json({
		success: true,
		data: center
	})
})

// @desc  update center
// @router PUT /api/v1/centers/:id
// @access private
exports.updateCenter = asyncHandler(async (req, res, next) => {
	const center = await Center.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	if (!center) {
		return next(
			new errorResponse(`Center not Found with id of${req.params.id}`, 404)
		)
	}

	res.status(200).json({
		success: true,
		data: center
	})
})

// @desc  delete center
// @router DELETE /api/v1/centers/:id
// @access private
exports.deleteCenter = asyncHandler(async (req, res, next) => {
	const center = await Center.findById(req.params.id)
	if (!center) {
		return res.status(400).json({
			success: false
		})
	}

	center.remove()

	res.status(200).json({
		success: true,
		data: {}
	})
})

// @desc  upload photo
// @router PUT /api/v1/centers/:id/photo
// @access private
exports.centerPhotoUpload = asyncHandler(async (req, res, next) => {
	const center = await Center.findById(req.params.id)
	if (!center) {
		return res.status(400).json({
			success: false
		})
	}

	if (!req.files) {
		return next(new errorResponse(`please upload a photo`, 400))
	}

	const file = req.files.file

	//make sure the img is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new errorResponse(`please upload a valid photo`, 400))
	}

	//check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(new errorResponse(`max image size is 1 mb`, 400))
	}

	//create custom file name
	file.name = `photo_${center._id}${path.parse(file.name).ext}`

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
		if (err) {
			return next(new errorResponse(`problem with file upload`, 500))
		}

		await Center.findByIdAndUpdate(req.params.id, { photo: file.name })
		res.status(200).json({
			success: true,
			data: file.name
		})
	})
})

// @desc  get center within radius
// @router DELETE /api/v1/centers/radius/:zipcode/:distance
// @access private

// TODO
