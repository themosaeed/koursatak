const Course = require('../models/Course')
const Center = require('../models/Center')
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

// @desc  GET single Course
// @router GET /api/v1/courses/:courseId
// @access public
exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id).populate({
		path: 'center',
		select: 'name description'
	})

	if (!course) {
		return next(new errorResponse(`no course with id ${req.params.id}`, 404))
	}

	res.status(200).json({
		success: true,
		data: course
	})
})

// @desc  add a Course
// @router POST /api/v1/Centers/:centerId/courses
// @access private
exports.addCourse = asyncHandler(async (req, res, next) => {
	req.body.center = req.params.centerId
	const center = Center.findById(req.params.centerId)

	if (!center) {
		return next(new errorResponse(`no center with id ${req.params.id}`, 404))
	}

	const course = await Course.create(req.body)

	res.status(200).json({
		success: true,
		data: course
	})
})

// @desc  update a Course
// @router PUT /api/v1/courses/:id
// @access private
exports.updateCourse = asyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id)

	if (!course) {
		return next(new errorResponse(`no course with id ${req.params.id}`, 404))
	}

	course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	res.status(200).json({
		success: true,
		data: course
	})
})

// @desc  delete a Course
// @router DELETE /api/v1/courses/:id
// @access private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id)

	if (!course) {
		return next(new errorResponse(`no course with id ${req.params.id}`, 404))
	}

	await course.remove()
	res.status(200).json({
		success: true,
		data: {}
	})
})
