import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const Footer = ({
	counter: { totalCars, totalAmount, averagePrice },
	footerBtnHandler,
	modalHandler
}) => {
	const style = {
		marginRight: '20px'
	}
	return (
		<div className="footer">
			<div className="container footer__container">
				<div className="footer__counter">
					<div>
						Total cars: <b>{totalCars}</b>
					</div>
					<div>
						Total amount: <b>{totalAmount}$</b>
					</div>
					<div>
						Average price: <b>{averagePrice}$</b>
					</div>
				</div>
				<div className="footer__btns">
					<RaisedButton
						onClick={modalHandler}
						style={style}
						label="Drop all cars"
						secondary
					/>
					<RaisedButton
						onClick={() => footerBtnHandler('post')}
						style={style}
						label="Add more cars"
					/>
				</div>
			</div>
		</div>
	)
}

export default Footer
