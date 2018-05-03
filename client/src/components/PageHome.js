import React, { Fragment } from 'react'
import CarList from './CarList'
import Footer from './Footer'

const PageHome = props => {
	return (
		<Fragment>
			<CarList deleteCarHandler={props.deleteCarHandler} {...props.state} />
			<Footer
				modalHandler={props.modalHandler}
				footerBtnHandler={props.footerBtnHandler}
				counter={props.state.counter}
			/>
		</Fragment>
	)
}

export default PageHome
