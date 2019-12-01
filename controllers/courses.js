const Course = require('../models/Course')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc  GET all Courses
// @router GET /api/v1/courses
// @router GET /api/v1/Centers/:centerId/courses
// @access public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query
	if (req.params.centerId) {
		query = Course.find({ center: req.params.centerId })
	} else {
		query = Course.find().populate({
			path: 'center',
			select: 'name description'
		})
	}
	const courses = await query

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	})
})
