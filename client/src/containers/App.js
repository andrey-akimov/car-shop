import React, { Component, Fragment } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import generateData from '../helper'
import Header from '../components/Header'
import PageHome from '../components/PageHome'
import PageAddCar from './PageAddCar'
import PageNotFound from '../components/PageNotFound'

class App extends Component {
	state = {
		data: [],
		loading: false,
		error: false,
		snackbarOpen: false,
		modalOpen: false,
		menuOpen: false,
		counter: {
			totalCars: 0,
			totalAmount: 0,
			averagePrice: 0
		}
	}

	// Handlers
	deleteCarHandler = id => {
		axios
			.delete(`https://cars-shop.herokuapp.com/api/${id}`)
			.then(res => {
				this.getData()
			})
			.catch(err => {
				this.setState({
					loading: false,
					error: true
				})
			})
	}

	footerBtnHandler = method => {
		// If user wants too much data :)
		if (method === 'post' && this.state.data.length >= 100) {
			this.setState({ snackbarOpen: true })
			return false
		}
		axios({
			method,
			url: `https://cars-shop.herokuapp.com/api`,
			data: generateData()
		})
			.then(res => {
				this.getData()
			})
			.catch(err => {
				this.setState({
					loading: false,
					error: true
				})
			})
	}

	snackbarHandler = () => {
		this.setState({ snackbarOpen: false })
	}

	ErrorSnackbarHandler = () => {
		this.setState({ error: false })
	}

	modalHandler = () => {
		if (this.state.data.length === 0) {
			return false
		}
		this.setState({ modalOpen: !this.state.modalOpen })
	}

	menuHandler = () => {
		this.setState({ menuOpen: !this.state.menuOpen })
	}

	getData = () => {
		this.setState({ loading: true })
		axios
			.get(`https://cars-shop.herokuapp.com/api`)
			.then(res => {
				// Count
				let totalAmount = 0
				res.data.forEach(element => {
					totalAmount += element.price
				})
				const totalCars = res.data.length
				this.setState({
					data: res.data,
					loading: false,
					counter: {
						totalCars,
						totalAmount,
						averagePrice: +(totalAmount / totalCars).toFixed(2) || 0
					}
				})
			})
			.catch(err => {
				this.setState({
					loading: false,
					error: true
				})
			})
	}

	// CDM
	componentDidMount() {
		this.getData()
	}

	render() {
		const actions = [
			<FlatButton label="Cancel" primary onClick={this.modalHandler} />,
			<FlatButton
				label="Ok"
				secondary
				onClick={() => {
					this.footerBtnHandler('delete')
					this.modalHandler()
				}}
			/>
		]

		return (
			<MuiThemeProvider>
				<Fragment>
					<Header menuHandler={this.menuHandler} menuOpen={this.state.menuOpen} />
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<PageHome
									deleteCarHandler={this.deleteCarHandler}
									modalHandler={this.modalHandler}
									footerBtnHandler={this.footerBtnHandler}
									state={this.state}
								/>
							)}
						/>
						<Route
							path="/add-car"
							render={() => <PageAddCar getData={this.getData} />}
						/>
						<Route component={PageNotFound} />
					</Switch>

					{/* Snackbar */}
					<Snackbar
						open={this.state.snackbarOpen}
						message="Quit fooling around!"
						autoHideDuration={4000}
						onRequestClose={this.snackbarHandler}
						style={{ textAlign: 'center' }}
					/>
					<Snackbar
						open={this.state.error}
						message="Some server error :("
						autoHideDuration={4000}
						onRequestClose={this.ErrorSnackbarHandler}
						style={{
							textAlign: 'center',
							fontWeight: 'bold',
							backgroundColor: 'red'
						}}
					/>
					{/* Modal */}
					<Dialog
						actions={actions}
						modal={false}
						open={this.state.modalOpen}
						onRequestClose={this.modalHandler}
						style={{ fontWeight: 'bold' }}
					>
						Are you sure?
					</Dialog>
				</Fragment>
			</MuiThemeProvider>
		)
	}
}

export default App
