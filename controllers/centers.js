const Center = require('../models/Center')
const errorResponse = require('../utils/errorResponse')
// @desc  GET all Centers
// @router GET /api/v1/centers
// @access public
exports.getCenters = async (req, res, next) => {
	try {
		const centers = await Center.find()
		res.status(200).json({
			success: true,
			count: centers.length,
			data: centers
		})
	} catch (err) {
		next(err)
	}
}

// @desc  GET center
// @router GET /api/v1/centers/:id
// @access public
exports.getOneCenters = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}

// @desc  POST center
// @router POST /api/v1/centers/:id
// @access private
exports.createCenter = async (req, res, next) => {
	try {
		const center = await Center.create(req.body)
		res.status(201).json({
			success: true,
			data: center
		})
	} catch (err) {
		next(err)
	}
}

// @desc  update center
// @router PUT /api/v1/centers/:id
// @access private
exports.updateCenter = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}

// @desc  delete center
// @router DELETE /api/v1/centers/:id
// @access private
exports.deleteCenter = async (req, res, next) => {
	try {
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
	} catch (err) {
		next(err)
	}
}
