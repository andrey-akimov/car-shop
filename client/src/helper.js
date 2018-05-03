import randomWords from 'random-words'

// Generate 20 new car objects
const generateData = () => {
	const newData = []
	const makes = ['Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Lexus', 'Nissan']
	for (let i = 0; i < 20; i++) {
		newData.push({
			title: makes[Math.floor(Math.random() * makes.length)],
			description: randomWords({ min: 40, max: 150, join: ' ' }),
			price: Math.floor(Math.random() * (10000 - 1000)) + 1000
		})
	}
	return newData
}

export default generateData
