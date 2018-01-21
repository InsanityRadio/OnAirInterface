import React, { Component } from 'react';

class Network extends Component {

	offer () {
		this.props.controller.offer(this.props.network)
	}

	accept () {
		this.props.controller.accept(this.props.network)
	}

	take (isForcing) {
		if (isForcing && !window.confirm('Are you sure you wish to forcefully take control of this network? Don\'t do this unless you really need to!')) {
			return;
		}
		this.props.controller.take(this.props.network)
	}

	render () {

		let network = this.props.network, studio = this.props.studio;

		let amIOnAir = network.studio === studio.id;
		let haveIAccepted = network.acceptor == studio.id;
		let haveTheyAccepted = amIOnAir && !haveIAccepted;

		return (
			<div className="inner network">
				<h2>{ network.description }</h2>
				{ (amIOnAir && haveIAccepted) ? 
					<p className="air on">ON AIR</p> : ( (haveIAccepted || amIOnAir) ?
					<p><b>{ network.studio } LIVE</b> / { network.acceptor } control</p> : 
					<p className="air off"><b>{ network.studio }</b> { network.offered ? 'is offering control' : 'has control' }</p>
				)}

				<button className="offer" onClick={ this.offer.bind(this) } disabled={ !amIOnAir || network.offered }>
					{ haveTheyAccepted ? 'Offered' : 'Offer' }
				</button>

				<button className={ 'accept ' + (network.offered ? 'ready' : '') } onClick={ this.accept.bind(this) } disabled={ !network.offered }>
					Accept
				</button>

				<button className="take" onClick={ () => this.take(!haveIAccepted) } disabled={ amIOnAir }>
					{ haveIAccepted ? 'Execute': 'Take' }
				</button>
			</div>
		)

	}

}

export default Network;