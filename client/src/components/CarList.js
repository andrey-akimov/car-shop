import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Car from './Car'

const CarList = ({ data, loading, counter, deleteCarHandler }) => {
	if (loading) {
		return <CircularProgress size={80} thickness={5} className="spinner" />
	}

	if (data.length === 0) {
		return <h2 className="no-cars">There are no cars for sale :(</h2>
	}

	return (
		<div className="car-list container">
			{data.map(el => (
				<Car counter={counter} deleteCarHandler={deleteCarHandler} key={el._id} {...el} />
			))}
		</div>
	)
}

export default CarList
