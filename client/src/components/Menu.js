import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Navigation from 'material-ui/svg-icons/navigation/menu'
import { Link } from 'react-router-dom'

const Menu = ({ menuHandler, menuOpen }) => {
	return (
		<div className="menu">
			<IconButton iconStyle={{ width: 60, height: 60 }}>
				<Navigation label="Open Drawer" onClick={menuHandler} />
			</IconButton>
			<Drawer
				docked={false}
				openSecondary
				width={200}
				open={menuOpen}
				onRequestChange={menuHandler}
			>
				<MenuItem className="menu__item" onClick={menuHandler}>
					<Link className="menu__link" to="/">
						Home
					</Link>
				</MenuItem>
				<MenuItem className="menu__item" onClick={menuHandler}>
					<Link className="menu__link" to="/add-car">
						Add a car
					</Link>
				</MenuItem>
			</Drawer>
		</div>
	)
}

export default Menu
