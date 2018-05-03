const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 3,
			trim: true
		},
		image: {
			type: String,
			default: 'https://cdn.bmwblog.com/wp-content/uploads/2017/06/1995-BMW-E34-520i-14.jpg'
		},
		description: {
			type: String,
			required: true,
			minlength: 10,
			trim: true
		},
		price: {
			type: Number,
			required: true,
			minlength: 3,
			trim: true
		}
	},
	{
		versionKey: false,
		collection: 'cars'
	}
)

const NewCar = mongoose.model('newCar', carSchema)

module.exports = NewCar
