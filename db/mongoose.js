const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(`mongodb://admin:admin@ds259499.mlab.com:59499/car-shop`)

module.exports = mongoose
