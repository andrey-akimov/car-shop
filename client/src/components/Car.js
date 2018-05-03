import React from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const Car = ({ title, description, image, price, deleteCarHandler, _id }) => {
	return (
		<Paper className="car-list__item" zDepth={2}>
			<img className="car-list__item_img" src={image} />
			<div className="car-list__item_text">
				<div className="car-list__top-line">
					<h3>{title}</h3>
					<FlatButton
						style={{ minWidth: '40px' }}
						label="X"
						secondary={true}
						onClick={() => deleteCarHandler(_id)}
					/>
				</div>
				<div className="car-list__description">
					{description.length > 400 ? description.slice(0, 400) + '...' : description}
				</div>
				<a href="/" className="read-more">
					Read more...
				</a>
				<p className="price">{price} $</p>
			</div>
		</Paper>
	)
}

export default Car
