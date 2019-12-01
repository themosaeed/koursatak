const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'please add a course title']
	},
	description: {
		type: String,
		require: [true, 'please enter a description']
	},
	duration: {
		type: String,
		require: [true, 'please enter a duration']
	},
	fees: {
		type: Number,
		require: [true, 'please enter a fee']
	},
	level: {
		type: String,
		require: [true, 'please enter course lever'],
		enum: ['beginner', 'intermediate', 'advanced']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	center: {
		type: mongoose.Schema.ObjectId,
		ref: 'Center',
		required: true
	}
})

module.exports = mongoose.model('Course', CourseSchema)
