const Center = require('../models/Center')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc  GET all Centers
// @router GET /api/v1/centers
// @access public
exports.getCenters = asyncHandler(async (req, res, next) => {
	let query
	//copy req. query
	const reqQuery = { ...req.query }

	//create query string
	let queryStr = JSON.stringify(reqQuery)

	//create operators ($gt ..)
	queryStr = queryStr.replace(/\b(gt|gte|le|lte|in)\b/g, match => `$${match}`)

	//finding resource
	query = Center.find(JSON.parse(queryStr))
	//excute query
	const centers = await query

	res.status(200).json({
		success: true,
		count: centers.length,
		data: centers
	})
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
	const center = await Center.findByIdAndDelete(req.params.id)
	if (!center) {
		return res.status(400).json({
			success: false
		})
	}

	res.status(200).json({
		success: true,
		data: {}
	})
})

// @desc  get center within radius
// @router DELETE /api/v1/centers/radius/:zipcode/:distance
// @access private

// TODO
