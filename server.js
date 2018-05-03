const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const NewCar = require('./models/newCar')
const mongoose = require('./db/mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client', 'dist')))

// allow CORS requests
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
	next()
})

// GET
app.get('/api', (req, res) => {
	NewCar.find({}, (err, docs) => {
		if (err) {
			return res.send(err)
		}
		return res.send(docs)
	})
})

// POST
app.post('/api', (req, res) => {
	NewCar.insertMany(req.body, (err, docs) => {
		if (err) {
			return res.send(err)
		}
		return res.sendStatus(200)
	})
})

// DELETE
app.delete('/api/:id', (req, res) => {
	NewCar.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			return res.send(err)
		}
		return res.sendStatus(200)
	})
})

// Drop collection
app.delete('/api', (req, res) => {
	mongoose.connection.db.dropCollection('cars', (err, result) => {
		if (err) {
			return res.send(err)
		}
		return res.sendStatus(200)
	})
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
