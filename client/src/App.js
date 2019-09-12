import React, { Component } from 'react';
import './App.css';

const server_addr = 'http://localhost:9999/';

class App extends Component {
	constructor(props) {
		super(props);
		this.submitURL = this.submitURL.bind(this);
		this.state = {
			original_url: '',
			shortened_url: '',
		};
	}

	submitURL() {
		const options = {
			body: JSON.stringify({ url: this.state.original_url }),
			headers: {'content-type': 'application/json'},
			method: 'POST',
		}

		return fetch(server_addr, options)
			.then(response => response.json(),
				  error => console.log('An error occurred.', error))
			.then((response) => {
				console.log(response);
				this.setState({ shortened_url: response.payload });
			}).catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<div className="App">
				<h1 className="App-title">URL Shortener</h1>
				<p className="App-intro">
					<input type="text" className="inputURL" onChange={ (e) => { this.setState({ original_url: e.target.value }); } } placeholder="https://example.com" />
					<button className="submitURL" onClick={() => this.submitURL()}>
						Submit URL
					</button>
					{this.state.shortened_url}
				</p>
			</div>
			);
		}
	}

export default App;
