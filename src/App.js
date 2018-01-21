import React, { Component } from 'react';
import './App.css';

import Network from './Network';
import VU from './VU';

class App extends Component {

	state = {
		networks: [{
			id: 0,
			name: 'insanity',
			description: 'Insanity (FM)',
			studio: 'S2A',
			offered: false,
			acceptor: 'S2A'
		}],
		studio: {
			id: 'S1A',
			name: 'Studio 1A',
			networks: []
		}
	}

	constructor (a) {

		super(a)

		setTimeout((a) => {
			let nets = this.state.networks;
			nets[0].offered = true;
			this.setState({ networks: nets })
		}, 1000)

	}

	offer (network) {
		let net = this.state.networks.map((a) => {
			if (a.id == network.id) {
				a.offered = true
			}
			return a;
		})
		this.setState({ networks: net })
	}

	accept (network) {
		let net = this.state.networks.map((a) => {
			if (a.id == network.id) {
				a.offered = false
				a.acceptor = this.state.studio.id
			}
			return a;
		})
		this.setState({ networks: net })
	}

	take (network) {
		let net = this.state.networks.map((a) => {
			if (a.id == network.id) {
				a.offered = false
				a.studio = this.state.studio.id
			}
			return a;
		})
		this.setState({ networks: net })
	}

	render () {

		let studio = this.state.studio;
		let networks = this.state.networks;
		let isOnAir = networks.some((a) => a.studio == studio.id);

		networks = networks.map((network) => <Network
			controller={ this }
			network={ network }
			studio={ studio } />)

		return (
			<div className="App">
				<div className="ident">
					{ isOnAir && <span>ON AIR</span> }
					<h1>{ studio.name }</h1>
				</div>

				<div className="networks">
					<h3>Networks</h3>
					{ networks }
				</div>

				<div className="vu">
					<VU />
				</div>

				<div className="docs">
					<h3>Quick Reference</h3>
					<div className="inner">

						<p>This system lets you control the radio studios, specifically which one is on air/connected to the transmitter.</p>

						<p><b>Taking Control</b></p>

						<p>When another studio offers you control of Insanity Radio, the "Accept" button will flash. Click it to accept control. To then actually take control, click the "Execute" button. This will immediately switch network control to you.</p>

						<p>It is ideal to fade up the studio that is giving you network, otherwise the transition won't be as smooth as it could be. </p>

						<p><b>Giving Away Control</b></p>

						<p>To transfer the network away, click the "Offer" button. The studio that is to go on air should click "Accept".</p>

						<p>If you have offered network by mistake, etc., click the "Accept" button to cancel.</p>

						<p>If, for any reason, you're not on air (and you should be), click the "Take" button.</p>

					</div>
				</div>
			</div>
		);

	}

}

export default App;
